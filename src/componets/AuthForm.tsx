import React, { useState } from 'react';
import { setCookie } from '../utils/storage';
import bgCreative from '../assets/images/authForm/bgCreative01.jpg'
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";


interface AuthFormProps {
  onSuccess: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = import.meta.env.VITE_APP_PASSWORD;
    
    if (password === correctPassword) {
      setCookie('isAuthenticated', 'true', 10);
      onSuccess();
    } else {
      setError('Неверный пароль');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-overlay">
      <div className="auth-creative">
        <img src={bgCreative} alt="famile" />
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Вход в семейный архив</h2>
        <h6>Прикоснитесь к истории вашей семьи. Введите пароль, чтобы открыть дверь в прошлое</h6>
        <div className="auth-form_box">
          <label htmlFor="password">Пароль доступа</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите секретный пароль"
              required
            />
            <button 
              type="button" 
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <MdOutlineVisibility/> : <MdOutlineVisibilityOff/>}
            </button>
          </div>
          {error && <p className="error">{error}</p>}
        </div>
        
        <button type="submit">Открыть историю</button>
      </form>
    </div>
  );
};

export default AuthForm;