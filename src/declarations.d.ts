declare module 'swiper/css';
declare module 'swiper/css/navigation';
declare module 'swiper/css/pagination';
declare module 'swiper/css/effect-coverflow';
declare module 'swiper/css/parallax';
declare module 'swiper/css/scrollbar';

declare interface Window {
    [key: string]: (response: any[]) => void;
  }