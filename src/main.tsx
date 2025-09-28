import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss'
import App from './App.tsx'
import { PeopleDataProvider } from './hooks/usePeopleData.tsx';
import { SearchProvider } from './hooks/SearchProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PeopleDataProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </PeopleDataProvider>
  </StrictMode>,
)
