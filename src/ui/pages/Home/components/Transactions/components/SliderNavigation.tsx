import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useSwiper } from 'swiper/react';

import { Button } from '@ui/components/Button';

type SliderNavigationProps = {
  isBeginning: boolean;
  isEnd: boolean;
};

export function SliderNavigation({
  isBeginning,
  isEnd,
}: SliderNavigationProps) {
  const swiper = useSwiper();

  return (
    <>
      <Button
        className="absolute  left-0 top-[50%] translate-y-[-50%] z-[1000] size-12 rounded-md"
        variant="ghost"
        onClick={() => swiper.slidePrev()}
        disabled={isBeginning}
      >
        <ArrowLeft />
      </Button>

      <Button
        className="absolute  right-0 top-[50%] translate-y-[-50%] z-[1000] size-12 rounded-md"
        variant="ghost"
        onClick={() => swiper.slideNext()}
        disabled={isEnd}
      >
        <ArrowRight />
      </Button>
    </>
  );
}
