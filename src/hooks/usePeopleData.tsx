import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { formatDate } from './formateDate';

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateAge: string;
  age: number;
  description: string;
  avatarUrl: string;
  galleryUrl: string[];
  x: number;
  y: number;
  parents: string[];
  children: string[];
  connectionGroup: string;
}

interface Connection {
  id: string;
  parentId: string;
  childId: string;
  connectionId: string;
  x: number;
  y: number;
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
        console.log('Raw response:', response);

        // Парсим людей
        const peopleData: Person[] = response.map((item, index) => {
          const parseIds = (value: any): string[] => {
            if (!value) return [];
            if (typeof value === 'string') {
              // Удаляем лишние пробелы и кавычки
              return value
                .replace(/['"]+/g, '') // Удаляем кавычки
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

          console.log(`Item ${index} raw parents:`, item.parents, 'typeof:', typeof item.parents);
          console.log(`Item ${index} raw children:`, item.children, 'typeof:', typeof item.children);

          return {
            id: item.ID?.toString() || `id-${index}`,
            firstName: item.Имя || '',
            lastName: item.Фамилия || '',
            email: item.Email || '',
            age: Number(item.Возраст) || 0,
            dateAge: formatDate(item.Рождение) || '',
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
            connectionGroup: item.connection?.toString() || 'default',
          };
        });

        console.log('Parsed people:', peopleData);

        // Создаем карту людей
        const peopleMap = new Map(peopleData.map(person => [person.id, person]));
        console.log('People map keys:', Array.from(peopleMap.keys()));

        // Генерируем связи
        const connections: Connection[] = [];
        peopleData.forEach(person => {
          person.parents.forEach(parentId => {
            // Удаляем возможные кавычки из parentId
            const cleanParentId = parentId.replace(/['"]+/g, '');
            if (peopleMap.has(cleanParentId)) {
              const parent = peopleMap.get(cleanParentId)!;
              connections.push({
                id: `${cleanParentId}-${person.id}`,
                parentId: cleanParentId,
                childId: person.id,
                connectionId: person.connectionGroup || 'default',
                x: parent.x,
                y: parent.y,
              });
            } else {
              console.warn(`Parent ${cleanParentId} not found for person ${person.id}`);
            }
          });
        });

        console.log('Generated connections:', connections);

        setState({
          people: peopleData,
          connections,
          loading: false,
          error: null,
        });
      } catch (err) {
        console.error('Parsing error:', err);
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
    console.log('Loading script with URL:', apiUrl);

    const script = document.createElement('script');
    script.src = apiUrl;
    script.onerror = () => {
      console.error('Script loading failed');
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