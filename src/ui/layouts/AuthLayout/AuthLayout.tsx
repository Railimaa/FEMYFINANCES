import { Outlet } from 'react-router-dom';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ImageSlider } from './components/ImageSlider';
import { SliderNavigate } from './components/SliderNavigate';
import { useAuthLayout } from './hooks/useAuthLayout';

export function AuthLayout() {
  const { listImagesSlides, swiperRef, swiperState, setSwiperState } =
    useAuthLayout();

  return (
    <div className="w-full min-h-screen flex ">
      <div className="w-full flex flex-col lg:flex-row  justify-center items-center gap-[20px] py-[24px] px-[32px] ">
        <div className="w-full lg:max-w-[60%] flex lg:justify-center  h-full px-6  py-[80px] lg:py-[130px] ">
          <Outlet />
        </div>

        <div className="hidden lg:flex flex-col  w-full max-w-[40%] h-full border border-foreground/5 rounded-lg">
          <div className="min-h-full flex relative overflow-visible">
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              centeredSlides
              className="w-full h-full overflow-hidden"
              onSlideChange={(swiper) => {
                setSwiperState({
                  isBeginning: swiper.isBeginning,
                  isEnd: swiper.isEnd,
                });
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {listImagesSlides.map((imgSlide) => (
                <SwiperSlide key={imgSlide.title}>
                  <ImageSlider
                    img={imgSlide.img}
                    title={imgSlide.title}
                    subTitle={imgSlide.subTitle}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <SliderNavigate swiperRef={swiperRef} swiperState={swiperState} />
          </div>
        </div>
      </div>
    </div>
  );
}
