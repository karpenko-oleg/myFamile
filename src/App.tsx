import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PersonPage from './pages/PersonPage';
import Header from './componets/Header';
import Nopage from './pages/Nopage';
import Home from './pages/Home';
import AuthForm from './componets/AuthForm';
import AnimatedLoader from './componets/AnimatedLoader';
import { getCookie, getSessionStorage, setSessionStorage } from './utils/storage';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [loaderFinished, setLoaderFinished] = useState(false);

  // Проверяем авторизацию при загрузке приложения
  useEffect(() => {
    const authCookie = getCookie('isAuthenticated');
    if (authCookie === 'true') {
      setIsAuthenticated(true);
      
      // Проверяем, нужно ли показывать анимацию
      const animationShown = getSessionStorage('animationShown');
      if (animationShown !== 'true') {
        setShowLoader(true);
        
        // Запускаем таймер на 4 секунды для анимации
        const animationTimer = setTimeout(() => {
          setLoaderFinished(true);
          setSessionStorage('animationShown', 'true');
        }, 4000);
        
        return () => clearTimeout(animationTimer);
      } else {
        // Если анимация уже была показана, сразу завершаем
        setLoaderFinished(true);
      }
    }
  }, []);

  // Обработка успешной аутентификации
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowLoader(true);
    
    // Запускаем таймер на 4 секунды для анимации
    const animationTimer = setTimeout(() => {
      setLoaderFinished(true);
      setSessionStorage('animationShown', 'true');
    }, 4000);
    
    return () => clearTimeout(animationTimer);
  };

  // Если не авторизован - показываем форму входа
  if (!isAuthenticated) {
    return <AuthForm onSuccess={handleAuthSuccess} />;
  }

  // Если авторизован, но показываем лоадер
  if (showLoader && !loaderFinished) {
    return <AnimatedLoader />;
  }

  return (
    <div className="app">
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:name/:id" element={<PersonPage />} />
            <Route path="*" element={<Nopage />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;