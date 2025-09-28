import React, { useEffect, useRef, useState } from 'react';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import { HiMagnifyingGlassPlus } from "react-icons/hi2";
import { HiMagnifyingGlassMinus } from "react-icons/hi2";
import { RxUpdate } from "react-icons/rx";
import CartSvgLines from '../componets/CartSvgLines';
import { usePeopleData } from '../hooks/usePeopleData';
import CartPeople from './CartPeople';
import Loader from './Loader';
import { useSearch } from '../hooks/SearchProvider';

const Canvas: React.FC = () => {
  const { people, connections, loading, error } = usePeopleData();
  const { highlightedPerson } = useSearch();
  const [scale, setScale] = useState(1);
  const transformComponentRef = useRef<ReactZoomPanPinchRef>(null);

  // Функция для перемещения к человеку
  const moveToPerson = (personX: number, personY: number) => {
    if (transformComponentRef.current) {
      const { setTransform } = transformComponentRef.current;
      
      // Получаем размеры контейнера
      const container = document.querySelector('.canvas__container');
      if (!container) return;
      
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      // Вычисляем центр экрана
      const centerX = containerWidth / 2;
      const centerY = containerHeight / 2;
      
      // Вычисляем смещение для центрирования человека
      const targetX = centerX - personX * scale;
      const targetY = centerY - personY * scale;
      
      // Плавное перемещение к цели
      setTransform(targetX, targetY, scale, 1000);
    }
  };

  // Эффект для автоматического перемещения при поиске
  useEffect(() => {
    if (highlightedPerson) {
      const person = people.find(p => p.id === highlightedPerson);
      if (person) {
        console.log('Перемещаемся к:', person.firstName, person.lastName);
        
        // Небольшая задержка для гарантии рендера компонента
        setTimeout(() => {
          moveToPerson(person.x, person.y);
        }, 100);
      }
    }
  }, [highlightedPerson, people, scale]);

  if (loading) return <Loader/>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="canvas">
      <TransformWrapper
        ref={transformComponentRef}
        initialScale={0.6}
        minScale={0.3}
        maxScale={1}
        limitToBounds={false}
        onZoom={(ref) => setScale(ref.state.scale)}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className='canvas__controls'>
              <button onClick={() => zoomIn(0.2)} title="Увеличить">
                <HiMagnifyingGlassPlus fontSize={25}/>
              </button>
              <button onClick={() => zoomOut(0.2)} title="Уменьшить">
                <HiMagnifyingGlassMinus fontSize={25}/>
              </button>
              <button onClick={() => resetTransform()} title="Сбросить масштаб">
                <RxUpdate fontSize={20}/>
              </button>
            </div>

            <div className="canvas__container">
              <TransformComponent
                contentStyle={{
                  position: 'relative',
                  width: '2000px',
                  height: '2000px'
                }}
              >
                {people.map(person => (
                  <div
                    key={person.id}
                    style={{
                      position: 'absolute',
                      left: person.x,
                      top: person.y,
                      transform: 'translate(-50%, -50%)',
                      transition: 'all 0.3s ease',
                      willChange: 'transform',
                      zIndex: person.id === highlightedPerson ? 10000 : 9999,
                      ...(person.id === highlightedPerson && {
                        filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))',
                        transform: 'translate(-50%, -50%) scale(1.1)'
                      })
                    }}
                  >
                    <CartPeople
                      // @ts-ignore
                      person={person} 
                      isHighlighted={person.id === highlightedPerson}
                    />
                  </div>
                ))}

                <CartSvgLines
                  people={people}
                  connections={connections}
                  scale={scale}
                />
              </TransformComponent>
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default Canvas;