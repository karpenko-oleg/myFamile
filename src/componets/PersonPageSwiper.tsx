import React, { useState, useEffect } from "react";
import { Navigation, Pagination, A11y, EffectCoverflow, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoMdClose } from "react-icons/io";

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
    <div className='personPageSwiper'>
      <div className={`${isFullScreen ? "personPageSwiper__fullscreenBg" : ""}`}>
      <button onClick={toggleFullScreen} className="personPageSwiper__fullscreenBtn">
        {isFullScreen ? <IoMdClose fontSize="22"/> : "Полный экран"}
      </button>
      {isFullScreen ? (
          <Swiper
            spaceBetween={20}
            slidesPerView="auto"
            navigation
            pagination={{ 
              clickable: true,
              dynamicBullets: true 
            }}
            initialSlide={Math.floor(photoAlbum.length / 2)}
            loop={true}
            className="personPageSwiper__fullscreen-swiperBg"  
            modules={[Navigation, Pagination, FreeMode]}    
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
            
              },
              768: {
                slidesPerView: 2,
          
              },
              1024: {
                slidesPerView: 3,
      
              },
              1440: {
                slidesPerView: 4,
                spaceBetween: 20,
            
              }
            }}
          >
            {photoAlbum?.map((urlSrc, index) => (
              <SwiperSlide key={index}>
                <img 
                    src={urlSrc} 
                    alt={`Gallery image ${index + 1}`}
                    className="personPageSwiper__fullscreen-swiperImage"
                    loading="lazy"
                  />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <>
          <Swiper
            modules={[Navigation, Pagination, A11y, EffectCoverflow]}
            spaceBetween={15}
            slidesPerView={4}
            navigation
            pagination={{ 
              clickable: true,
              dynamicBullets: true
            }}
            centeredSlides={true}
            initialSlide={Math.floor(photoAlbum.length / 2)}
            loop={true}
            className="personPageSwiper__swiper"
            breakpoints={{
              320: {
                slidesPerView: 1.5,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              }
            }}
          >
            {photoAlbum?.map((urlSrc, index) => (
              <SwiperSlide key={index}>
                <img 
                    src={urlSrc} 
                    alt={`Gallery image ${index + 1}`}
                    className="personPageSwiper__swiper-image"
                    loading="lazy"
                  />
              </SwiperSlide>
            ))}
          </Swiper>
          </>
        )}
      </div>
    </div>
  );
};

export default PersonPageSwiper;