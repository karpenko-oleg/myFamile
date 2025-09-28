// hooks/SearchProvider.ts
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Person } from './usePeopleData';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  highlightedPerson: string | null;
  setHighlightedPerson: (id: string | null) => void;
  searchResults: Person[]; // Добавляем
  setSearchResults: (results: Person[]) => void; // Добавляем
  clearSearch: () => void;
  showResults: boolean; // Добавляем
  setShowResults: (show: boolean) => void; // Добавляем
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedPerson, setHighlightedPerson] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Person[]>([]); // Добавляем
  const [showResults, setShowResults] = useState(false); // Добавляем

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setHighlightedPerson(null);
    setSearchResults([]); // Добавляем
    setShowResults(false); // Добавляем
  }, []);

  const value = {
    searchQuery,
    setSearchQuery,
    highlightedPerson,
    setHighlightedPerson,
    searchResults, // Добавляем
    setSearchResults, // Добавляем
    clearSearch,
    showResults, // Добавляем
    setShowResults // Добавляем
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};