import React, { useState, useEffect } from "react";
import { Navigation, Pagination, A11y, EffectCoverflow, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

interface Photo {
  photoAlbum: string[];
}

const PersonPageSwiper: React.FC<Photo> = ({ photoAlbum }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  useEffect(() => {
    if (isFullScreen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isFullScreen]);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className={`personPageSwiper ${isFullScreen ? "fullscreen" : ""}`}>
      <button onClick={toggleFullScreen} className="fullscreen-button">
        {isFullScreen ? "Закрыть" : "Полный экран"}
      </button>

      {isFullScreen ? (
        // Полноэкранный режим - свободное перемещение
        <Swiper
          modules={[Navigation, Pagination, A11y, FreeMode]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ 
            clickable: true,
            dynamicBullets: true 
          }}
          freeMode={{
            enabled: true,
            momentum: true,
            momentumBounce: true,
            momentumVelocityRatio: 0.5,
            sticky: false
          }}
          centeredSlides={true}
          initialSlide={Math.floor(photoAlbum.length / 2)}
          loop={true}
          className="fullscreen-swiper"
          keyboard={{ enabled: true }}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 1
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
              freeMode: {
                enabled: true,
                momentum: true
              }
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
              freeMode: {
                enabled: true,
                momentum: true
              }
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
              freeMode: {
                enabled: true,
                momentum: true
              }
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 25,
              freeMode: {
                enabled: true,
                momentum: true
              }
            }
          }}
        >
          {photoAlbum?.map((urlSrc, index) => (
            <SwiperSlide key={index}>
              <div className="slide-container">
                <img 
                  src={urlSrc} 
                  alt={`Gallery image ${index + 1}`}
                  className="swiper-image"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // Обычный режим - 3 слайда с coverflow эффектом
        <Swiper
          modules={[Navigation, Pagination, A11y, EffectCoverflow]}
          spaceBetween={30}
          slidesPerView={3}
          navigation
          pagination={{ 
            clickable: true,
            dynamicBullets: true
          }}
          effect="coverflow"
          centeredSlides={true}
          initialSlide={Math.floor(photoAlbum.length / 2)}
          loop={true}
          className="personPageSwiper-swiper"
          keyboard={{ enabled: true }}
          coverflowEffect={{
            rotate: 0, // Уменьшил вращение для лучшего вида
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false, // Убрал тени для чистоты
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
              coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 50,
                modifier: 1,
                slideShadows: false
              }
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
              coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 80,
                modifier: 1.5,
                slideShadows: false
              }
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
              coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2,
                slideShadows: false
              }
            }
          }}
        >
          {photoAlbum?.map((urlSrc, index) => (
            <SwiperSlide key={index}>
              <div className="slide-container">
                <img 
                  src={urlSrc} 
                  alt={`Gallery image ${index + 1}`}
                  className="swiper-image"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default PersonPageSwiper;