import { useRef, useCallback } from 'react';

export const useSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = useCallback(() => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio('/sounds/openContent.mp3');
        // Предзагружаем звук
        audioRef.current.load();
      }
      
      // Сбрасываем звук на начало и воспроизводим
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.log('Автовоспроизведение заблокировано:', error);
      });
    } catch (error) {
      console.error('Ошибка воспроизведения звука:', error);
    }
  }, []);

  return playSound;
};