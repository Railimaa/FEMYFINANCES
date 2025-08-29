import { useRef, useState } from 'react';
import { Swiper } from 'swiper/types';

import Img1 from '@ui/assets/images/imagesSignAndSignUp/img1.svg';
import Img2 from '@ui/assets/images/imagesSignAndSignUp/img2.svg';
import Img3 from '@ui/assets/images/imagesSignAndSignUp/img3.svg';

import { ImageSlider } from '../types/ImageSlider';

export function useAuthLayout() {
  const swiperRef = useRef<Swiper | null>(null);
  const [swiperState, setSwiperState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const listImagesSlides: ImageSlider[] = [
    {
      img: Img1,
      title: 'Bem-vindo(a) ao MyFinances',
      subTitle:
        'Cadastre cartões, controle transações e acompanhe seus gastos de forma simples e visual. Tudo o que você precisapara organizar sua vida financeira está aqui.',
    },
    {
      img: Img2,
      title: 'Esqueça as planilhas, adote a praticidade',
      subTitle:
        'Deixe para trás as planilhas complexas e tenha um controle financeiro direto no seu celular ou pc. Tudo simples, rápido e organizado.',
    },
    {
      img: Img3,
      title: 'Organize suas finanças sem esforço',
      subTitle:
        'Com a nossa ferramenta, você não precisa mais se preocupar com cálculos complicados. Tenha tudo o que precisa para gerenciar seu dinheiro em um só lugar.',
    },
  ];
  return {
    listImagesSlides,
    swiperRef,
    swiperState,
    setSwiperState,
  };
}
