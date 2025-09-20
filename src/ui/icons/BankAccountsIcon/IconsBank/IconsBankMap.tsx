import { Bb } from './Bb';
import { Bitcoin } from './Biticoin';
import { Bradesco } from './Bradesco';
import { Brb } from './Brb';
import { C6 } from './C6';
import { Caixa } from './Caixa';
import { Ethereum } from './Ethereum';
import { Inter } from './Inter';
import { Itau } from './Itau';
import { Neon } from './Neon';
import { Nubank } from './Nubank';
import { NuInvest } from './NuInvest';
import { PagBank } from './PagBank';
import { PayPal } from './PayPal';
import { PicPay } from './Picpay';
import { Rico } from './Rico';
import { Safra } from './Safra';
import { Santander } from './Santander';
import { Xp } from './Xp';

export const IconsBankMap = {
  Nubank,
  Santander,
  Inter,
  Bradesco,
  C6,
  Picpay: PicPay,
  PayPal,
  Neon,
  Itau,
  PagBank,
  Caixa,
  Bb,
  Brb,
  Safra,
  NuInvest,
  Xp,
  Rico,
  Bitcoin,
  Ethereum,
};

export type IconsBankType = keyof typeof IconsBankMap;
