import React, { useEffect } from 'react';
import { useSound } from '../hooks/useSound';

const AnimatedLoader: React.FC = () => {
  const playSound = useSound();

  // Воспроизводим звук только один раз при монтировании компонента
  useEffect(() => {
    playSound();
  }, [playSound]); // Добавляем playSound в зависимости

  return (
    <div className="loader-overlay">
      <svg 
        width="200" 
        height="200" 
        viewBox="0 0 200 200" 
        className="animated-svg"
      >
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="0.3em"
          className="loader-text"
        >
          моя родословная
        </text>
        
        <path
          className="path"
          d="M20,100 Q100,20 180,100 Q100,180 20,100 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default AnimatedLoader;