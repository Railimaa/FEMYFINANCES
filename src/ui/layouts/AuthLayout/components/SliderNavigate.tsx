import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { Swiper } from 'swiper/types';

import { cn } from '@app/utils/cn';
import { Button } from '@ui/components/Button';

interface ISliderNavigateProps {
  swiperState: {
    isBeginning: boolean;
    isEnd: boolean;
  };
  swiperRef: React.RefObject<Swiper | null>;
}

export function SliderNavigate({
  swiperState,
  swiperRef,
}: ISliderNavigateProps) {
  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        className={cn(
          'absolute top-[300px] -left-7 z-[1000]',
          swiperState.isBeginning && 'hidden',
        )}
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <ChevronLeft />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className={cn(
          'absolute top-[300px] -right-7 z-[1000]',
          swiperState.isEnd && 'hidden',
        )}
        onClick={() => swiperRef.current?.slideNext()}
      >
        <ChevronRight />
      </Button>
    </>
  );
}
