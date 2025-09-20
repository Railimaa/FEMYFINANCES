import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useSwiper } from 'swiper/react';

import { Button } from '@ui/components/Button';

type SliderNavigationProps = {
  isBegging: boolean;
  isEnd: boolean;
};

export function SliderNavigation({ isBegging, isEnd }: SliderNavigationProps) {
  const swiper = useSwiper();

  return (
    <div className="flex items-center justify-between">
      <Button
        size="icon"
        variant="ghost"
        onClick={() => swiper.slidePrev()}
        disabled={isBegging}
      >
        <ArrowLeft />
      </Button>

      <Button
        size="icon"
        variant="ghost"
        onClick={() => swiper.slideNext()}
        disabled={isEnd}
      >
        <ArrowRight />
      </Button>
    </div>
  );
}
