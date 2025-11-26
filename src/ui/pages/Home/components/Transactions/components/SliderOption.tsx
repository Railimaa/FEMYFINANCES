import { useSwiper } from 'swiper/react';

import { cn } from '@app/utils/cn';

type SliderOptionProps = {
  activeIndex: number;
  index: number;
  month: string;
};

export function SliderOption({ activeIndex, index, month }: SliderOptionProps) {
  const swiper = useSwiper();

  return (
    <button
      type="button"
      className={cn(
        'w-full h-12  outline-none border-none font-medium tracking-tighter text-sm',
        activeIndex === index && 'bg-background rounded-full',
      )}
      onClick={() => swiper.slideTo(index)}
    >
      {month}
    </button>
  );
}
