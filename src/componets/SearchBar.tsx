import React, { useState, useEffect, useRef } from 'react';
import { useSearch } from '../hooks/SearchProvider';
import { usePeopleData } from '../hooks/usePeopleData';
import { Person } from '../hooks/usePeopleData';

const SearchBar: React.FC = () => {
  const [localQuery, setLocalQuery] = useState('');
  const { 
    searchResults,
    showResults,
    setSearchQuery, 
    setHighlightedPerson, 
    setSearchResults, 
    clearSearch, 
    setShowResults 
  } = useSearch();
  
  const { people } = usePeopleData();
  const searchRef = useRef<HTMLDivElement>(null);

  // Закрываем результаты при клике вне области поиска
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowResults]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localQuery);
      
      if (localQuery.trim() === '') {
        clearSearch();
        return;
      }

      // Ищем всех подходящих людей
      const foundPeople = people.filter(person =>
        `${person.firstName} ${person.lastName}`.toLowerCase().includes(localQuery.toLowerCase()) ||
        person.firstName.toLowerCase().includes(localQuery.toLowerCase()) ||
        person.lastName.toLowerCase().includes(localQuery.toLowerCase())
      );

      setSearchResults(foundPeople);
      setShowResults(foundPeople.length > 0);
      
      // Если найден только один человек - сразу подсвечиваем его
      if (foundPeople.length === 1) {
        setHighlightedPerson(foundPeople[0].id);
      } else {
        setHighlightedPerson(null);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localQuery, setSearchQuery, setHighlightedPerson, clearSearch, people, setSearchResults, setShowResults]);

  const handleSearch = (query: string) => {
    setLocalQuery(query);
    setShowResults(true);
  };

  const handlePersonSelect = (person: Person) => {
    setHighlightedPerson(person.id);
    setLocalQuery(`${person.firstName} ${person.lastName}`);
    setShowResults(false);
  };

  const handleClear = () => {
    setLocalQuery('');
    clearSearch();
  };

  return (
    <div className="search-bar" ref={searchRef}>
      <input
        type="text"
        placeholder="Поиск по имени и фамилии..."
        value={localQuery}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => setShowResults(true)}
        className="search-input"
      />
      {localQuery && (
        <button onClick={handleClear} className="search-clear" title="Очистить">
          ✕
        </button>
      )}
      
      {showResults && searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map(person => (
            <div
              key={person.id}
              className="search-result-item"
              onClick={() => handlePersonSelect(person)}
            >
              <img 
                src={person.avatarUrl} 
                alt={`${person.firstName} ${person.lastName}`}
                className="search-result-avatar"
              />
              <div className="search-result-info">
                <div className="search-result-name">
                  {person.firstName} {person.lastName}
                </div>
                <div className="search-result-age">
                  Возраст: {person.age}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showResults && searchResults.length === 0 && localQuery && (
        <div className="search-results">
          <div className="search-no-results">
            Ничего не найдено
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;