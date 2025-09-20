import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useWindowWidth } from '@app/hooks/useWindowWidth';

import { BankAccount } from '../types/BankAccount';

import { CardBankAccount } from './CardBankAccount';
import { SliderNavigation } from './SliderNavigation';

type ContentBankAccountsProps = {
  isBegging: Record<string, boolean>;
  handleChangeIsBegging: (isBegging: boolean, isEnd: boolean) => void;
  bankAccounts: BankAccount[];
};

export function ContentBankAccounts({
  isBegging,
  handleChangeIsBegging,
  bankAccounts,
}: ContentBankAccountsProps) {
  const { width } = useWindowWidth();

  return (
    <div>
      <Swiper
        spaceBetween={16}
        slidesPerView={width >= 500 ? 2.1 : 1.2}
        onSlideChange={(swiper) => {
          handleChangeIsBegging(swiper.isBeginning, swiper.isEnd);
        }}
      >
        <div
          className="flex items-center justify-between mb-4"
          slot="container-start"
        >
          <span className="text-lg/snug font-bold tracking-[-1px]">
            Minhas contas
          </span>

          <div>
            <SliderNavigation
              isBegging={isBegging.isBegging}
              isEnd={isBegging.isEnd}
            />
          </div>
        </div>

        {bankAccounts.map((account) => (
          <SwiperSlide key={account.id}>
            <CardBankAccount bankAccount={account} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
