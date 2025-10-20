import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { formatDate } from './formateDate';

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  email: string;
  phone: string;
  address: string;
  placeBirth: string;
  age: number;
  dateAge: string;
  typeActivity: string;
  maritalStatus: string;
  education: string;
  kid: string;
  interests: string;
  description: string;
  avatarUrl: string;
  galleryUrl: string[];
  x: number;
  y: number;
  parents: string[];
  children: string[];
  spouses: string[];
  connectionGroup: string;
}

interface Connection {
  id: string;
  parentId: string;
  childId: string;
  spousesId: string[];
  connectionId: string;
  x: number;
  y: number;
  type: 'parent-child' | 'spouse';
}

interface PeopleDataContextType {
  people: Person[];
  connections: Connection[];
  loading: boolean;
  error: string | null;
}

const PeopleDataContext = createContext<PeopleDataContextType | undefined>(undefined);

export const PeopleDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PeopleDataContextType>({
    people: [],
    connections: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const callbackName = `handleJsonpResponse_${Math.random().toString(36).substr(2, 9)}`;

    window[callbackName] = (response: any[]) => {
      try {
        const peopleData: Person[] = response.map((item, index) => {
          const parseIds = (value: any): string[] => {
            if (!value) return [];
            if (typeof value === 'string') {
              return value
                .replace(/['"]+/g, '')
                .split(',')
                .map(s => s.trim())
                .filter(Boolean)
                .map(String);
            }
            if (typeof value === 'number') {
              return String(value).split('.').map(s => s.trim()).filter(Boolean).map(String);
            }
            if (Array.isArray(value)) {
              return value.map(String).filter(Boolean);
            }
            return [];
          };

          return {
            id: item.ID?.toString(),
            firstName: item.Имя || '',
            lastName: item.Фамилия || '',
            patronymic: item.Отчество || '',
            email: item.Email || '',
            phone: item.Телефон || '',
            address: item.Адрес || '',
            placeBirth: item.МестоРождения || '',
            age: Number(item.Возраст) || 0,
            dateAge: formatDate(item.Рождение) || '',
            typeActivity: item.РодДеятельности || '',
            maritalStatus: item.СемейноеПоложение || '',
            education: item.Образование || '',
            kid: item.Дети || '',
            interests: item.Интересы || '',
            description: item.Описание || '',
            avatarUrl: item.avatar || '',
            galleryUrl: item.gallery
              ? String(item.gallery)
                  .split(', https://')
                  .map(url => url.trim())
                  .map(url => url.startsWith('https://') ? url : 'https://' + url)
              : [],
            x: Number(item['По оси X']) || 0,
            y: Number(item['По оси Y']) || 0,
            parents: parseIds(item.parents),
            children: parseIds(item.children),
            spouses: parseIds(item.spouses),
            connectionGroup: item.connection?.toString() || 'default',
          };
        });

        const peopleMap = new Map(peopleData.map(person => [person.id, person]));

        // Генерируем связи
        const connections: Connection[] = [];

        // 1. Родительско-детские связи
        peopleData.forEach(person => {
          person.parents.forEach(parentId => {
            const cleanParentId = parentId.replace(/['"]+/g, '');
            if (peopleMap.has(cleanParentId)) {
              const parent = peopleMap.get(cleanParentId)!;
              connections.push({
                id: `${cleanParentId}-${person.id}`,
                parentId: cleanParentId,
                childId: person.id,
                spousesId: [], // пустой массив для родительско-детских связей
                connectionId: person.connectionGroup || 'default',
                x: parent.x,
                y: parent.y,
                type: 'parent-child'
              });
            } else {
              console.warn(`Parent ${cleanParentId} not found for person ${person.id}`);
            }
          });
        });

        // 2. Связи между супругами
        peopleData.forEach(person => {
          person.spouses.forEach(spouseId => {
            const cleanSpouseId = spouseId.replace(/['"]+/g, '');
            
            // Проверяем, существует ли супруг и чтобы не дублировать связи
            if (peopleMap.has(cleanSpouseId) && person.id < cleanSpouseId) {
              const spouse = peopleMap.get(cleanSpouseId)!;
              
              // Проверяем, есть ли общие дети у этих супругов
              const hasCommonChildren = person.children.some(childId => 
                spouse.children.includes(childId)
              ) || spouse.children.some(childId => 
                person.children.includes(childId)
              );

              connections.push({
                id: `${person.id}-${cleanSpouseId}-spouse`,
                parentId: person.id,
                childId: cleanSpouseId,
                spousesId: [person.id, cleanSpouseId],
                connectionId: person.connectionGroup || 'default',
                x: person.x,
                y: person.y,
                type: 'spouse'
              });
            }
          });
        });
        setState({
          people: peopleData,
          connections,
          loading: false,
          error: null,
        });
      } catch (err) {
        setState({
          people: [],
          connections: [],
          loading: false,
          error: err instanceof Error ? err.message : 'Unknown error',
        });
      }
    };

    // Ждём, пока callback зарегистрируется
    const URL = import.meta.env.VITE_API_URL;
    const TOKEN = import.meta.env.VITE_API_TOKEN;
    const apiUrl = `${URL}?token=${TOKEN}&callback=${callbackName}`;

    const script = document.createElement('script');
    script.src = apiUrl;
    script.onerror = () => {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Failed to load data',
      }));
    };
    document.body.appendChild(script);

    return () => {
      document.body.querySelector(`script[src*="${callbackName}"]`)?.remove();
      delete (window as any)[callbackName];
    };
  }, []);

  const value = useMemo(() => state, [state]);

  return <PeopleDataContext.Provider value={value}>{children}</PeopleDataContext.Provider>;
};

export const usePeopleData = () => {
  const context = useContext(PeopleDataContext);
  if (!context) {
    throw new Error('usePeopleData must be used within a PeopleDataProvider');
  }
  return context;
};