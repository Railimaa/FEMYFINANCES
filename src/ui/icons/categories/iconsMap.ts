import { Building } from './expense/Building';
import { Clothes } from './expense/Clothes';
import { CreditCard } from './expense/CreditCard';
import { Dumbbell } from './expense/Dumbbell';
import { Education } from './expense/Education';
import { Energy } from './expense/Energy';
import { Expense } from './expense/Expense';
import { Food } from './expense/Food';
import { Fun } from './expense/Fun';
import { Grocery } from './expense/Grocery';
import { HatGlasses } from './expense/HatGlasses';
import { Heart } from './expense/Heart';
import { Heartpulse } from './expense/Heartpulse';
import { Home } from './expense/Home';
import { Internet } from './expense/Internet';
import { Landmark } from './expense/Landmark';
import { MonitorSmartphone } from './expense/MonitorSmartphone';
import { Phone } from './expense/Phone';
import { PiggyBank } from './expense/PiggyBank';
import { Pill } from './expense/Pill';
import { Podcast } from './expense/Podcast';
import { Transport } from './expense/Transport';
import { Travel } from './expense/Travel';
import { TvMinimalPlay } from './expense/TvMinimalPlay';
import { Water } from './expense/Water';
import { BadgePercent } from './income/BadgePercent';
import { Coins } from './income/Coins';
import { HomeIncome } from './income/HomeIncome';
import { Income } from './income/Income';
import { RotateCcw } from './income/RotateCcw';
import { Tag } from './income/Tag';
import { TrendingUpIcon } from './income/TrendingUp';

export const iconsMap = {
  income: {
    default: Income,
    food: Food,
    fun: Fun,
    grocery: Grocery,
    home: Home,
    education: Education,
    clothes: Clothes,
    transport: Transport,
    travel: Travel,
    TrendingUp: TrendingUpIcon,
    HomeIncome,
    RotateCcw,
    Coins,
    BadgePercent,
    Tag,
  },
  expense: {
    default: Expense,
    food: Food,
    fun: Fun,
    grocery: Grocery,
    home: Home,
    education: Education,
    clothes: Clothes,
    transport: Transport,
    travel: Travel,
    rent: Home,
    building: Building,
    water: Water,
    energy: Energy,
    internet: Internet,
    phone: Phone,
    creditCard: CreditCard,
    piggyBank: PiggyBank,
    hatGlasses: HatGlasses,
    landmark: Landmark,
    heartpulse: Heartpulse,
    pill: Pill,
    dumbbell: Dumbbell,
    heart: Heart,
    podcast: Podcast,
    monitorSmartphone: MonitorSmartphone,
    tvMinimalPlay: TvMinimalPlay,
  },
};
