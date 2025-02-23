import React, { useRef, useState, useEffect } from 'react';
import { peopleData } from '../assets/data/objPeopleData';
import CartPeople from './CartPeople';

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  // Обработчик масштабирования с помощью колеса мыши
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const newScale = e.deltaY < 0 ? scale * 1.1 : scale / 1.1;
      setScale(Math.min(Math.max(newScale, 0.5), 3)); // Ограничение масштаба от 0.5 до 3
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('wheel', handleWheel);
      }
    };
  }, [scale]);

  // Обработчик начала перетаскивания
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  // Обработчик перемещения
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStartPos.current.x,
        y: e.clientY - dragStartPos.current.y,
      });
    }
  };

  // Обработчик окончания перетаскивания
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Обработчик кнопок масштабирования
  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale * 1.1, 3)); // Увеличение масштаба
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale / 1.1, 0.5)); // Уменьшение масштаба
  };

  // Применение трансформаций через matrix
  const transformStyle = {
    transform: `matrix(${scale}, 0, 0, ${scale}, ${position.x}, ${position.y})`,
  };

  return (
    <div className="container">
      {/* Кнопки масштабирования */}
      <div className="controls">
        <button onClick={handleZoomIn}>+</button>
        <button onClick={handleZoomOut}>-</button>
      </div>

      {/* Контейнер канваса */}
      <div
        className="canvas"
        ref={canvasRef}
        style={{
          position: 'relative',
          width: '1000px', // Фиксированная ширина канваса
          height: '1000px', // Фиксированная высота канваса
          overflow: 'hidden',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // Остановить перетаскивание, если курсор вышел за пределы
      >
        {/* Содержимое канваса (карточки людей) */}
        <div style={transformStyle}>
          {peopleData.map((person) => (
            <div
              key={person.id}
              className="person-container"
              style={{
                position: 'absolute',
                left: person.id * 200,
                top: person.id * 100,
              }}
            >
              <CartPeople person={person} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Canvas;