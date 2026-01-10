import { Bb } from './Bb';
import { Binance } from './Binance';
import { Bitcoin } from './Biticoin';
import { Bradesco } from './Bradesco';
import { Brb } from './Brb';
import { BTGPactual } from './Btg';
import { C6 } from './C6';
import { Caixa } from './Caixa';
import { Ethereum } from './Ethereum';
import { Inter } from './Inter';
import { Itau } from './Itau';
import { MercadoPago } from './MercadoPago';
import { Neon } from './Neon';
import { Next } from './Next';
import { Nubank } from './Nubank';
import { NuInvest } from './NuInvest';
import { PagBank } from './PagBank';
import { PayPal } from './PayPal';
import { PicPay } from './Picpay';
import { Rico } from './Rico';
import { Safra } from './Safra';
import { Santander } from './Santander';
import { Solana } from './Solana';
import { Xp } from './Xp';
import { Xrp } from './Xrp';

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
  MercadoPago,
  BTGPactual,
  Binance,
  Solana,
  Xrp,
  Next,
};

export type IconsBankType = keyof typeof IconsBankMap;
