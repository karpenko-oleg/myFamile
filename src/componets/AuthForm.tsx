// components/AuthForm.tsx
import React, { useState } from 'react';
import { setCookie } from '../utils/storage';

interface AuthFormProps {
  onSuccess: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = import.meta.env.VITE_APP_PASSWORD;
    
    if (password === correctPassword) {
      // Сохраняем в куки на 30 дней
      setCookie('isAuthenticated', 'true', 10);
      onSuccess();
    } else {
      setError('Неверный пароль');
    }
  };

  return (
    <div className="auth-overlay">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Введите пароль для доступа</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default AuthForm;