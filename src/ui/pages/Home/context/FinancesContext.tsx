import {
  createContext,
  ReactNode,
  RefObject,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Swiper } from 'swiper/types';

import { BankAccount } from '../components/BankAccounts/types/BankAccount';
import { useFilters } from '../components/Transactions/hooks/useFilters';
import { FilterTransaction } from '../components/Transactions/types/FilterTransaction';
import { Transaction } from '../components/Transactions/types/Transaction';

type FinancesContextValues = {
  openModalNewBankAccount: boolean;
  showTotalValue: boolean;
  handleToggleShowTotalValue: () => void;
  bankAccountIsBegging: BankAccount | null;
  handleOpenModalEditBankAccount: (bankAccount: BankAccount) => void;
  handleCloseModalEditBankAccount: () => void;
  openModalEditBankAccount: boolean;
  handleOpenModalNewBankAccount: () => void;
  handleCloseModalNewBankAccount: () => void;
  openModalNewTransaction: boolean;
  typeTransaction: 'INCOME' | 'EXPENSE';
  handleOpenModalNewTransaction: (
    typeTransaction: 'INCOME' | 'EXPENSE',
  ) => void;
  handleCloseModalNewTransaction: () => void;
  refSwiper: RefObject<Swiper | null>;
  openModalEditedTransaction: boolean;
  transactionIsBegging: Transaction | null;
  handleOpenModalEditedTransaction: (transaction: Transaction) => void;
  handleCloseModalEditedTransaction: () => void;
  filters: FilterTransaction;
  handleChangeFilter: (field: keyof FilterTransaction, value: any) => void;
};

export const FinancesContext = createContext({} as FinancesContextValues);

export function FinancesContextProvider({ children }: { children: ReactNode }) {
  const { filters, handleChangeFilter } = useFilters();

  const [openModalNewBankAccount, setOpenModalNewBankAccount] =
    useState<boolean>(false);
  const [openModalEditBankAccount, setOpenModalEditBankAccount] =
    useState<boolean>(false);
  const [openModalNewTransaction, setOpenModalNewTransaction] =
    useState<boolean>(false);
  const [openModalEditedTransaction, setOpenModalEditedTransaction] =
    useState(false);
  const [transactionIsBegging, setTransactionIsBegging] =
    useState<null | Transaction>(null);

  const refSwiper = useRef<Swiper | null>(null);

  const [typeTransaction, setTypeTransaction] = useState<'INCOME' | 'EXPENSE'>(
    'INCOME',
  );

  const [bankAccountIsBegging, setBankAccountIsBegging] =
    useState<BankAccount | null>(null);

  const [showTotalValue, setToggleShowTotalValue] = useState<boolean>(() => {
    const hasValueLocalStorage = localStorage.getItem('showTotalValue');

    if (hasValueLocalStorage) {
      const valueLocalStorageFormater = JSON.parse(hasValueLocalStorage);
      return valueLocalStorageFormater;
    }
    return true;
  });

  const handleToggleShowTotalValue = useCallback(() => {
    setToggleShowTotalValue((prevState) => {
      const value = !prevState;
      localStorage.setItem('showTotalValue', JSON.stringify(value));
      return value;
    });
  }, []);

  const handleOpenModalEditBankAccount = useCallback(
    (bankAccount: BankAccount) => {
      setBankAccountIsBegging(bankAccount);
      setOpenModalEditBankAccount(true);
    },
    [],
  );

  const handleCloseModalEditBankAccount = useCallback(() => {
    setBankAccountIsBegging(null);
    setOpenModalEditBankAccount(false);
  }, []);

  const handleOpenModalNewBankAccount = useCallback(() => {
    setOpenModalNewBankAccount(true);
  }, []);

  const handleCloseModalNewBankAccount = useCallback(() => {
    setOpenModalNewBankAccount(false);
  }, []);

  const handleOpenModalNewTransaction = useCallback(
    (typeTransaction: 'INCOME' | 'EXPENSE') => {
      setTypeTransaction(typeTransaction);
      setOpenModalNewTransaction(true);
    },
    [],
  );

  const handleCloseModalNewTransaction = useCallback(() => {
    setOpenModalNewTransaction(false);
  }, []);

  const handleOpenModalEditedTransaction = useCallback(
    (transaction: Transaction) => {
      setTransactionIsBegging(transaction);
      setOpenModalEditedTransaction(true);
    },
    [],
  );

  const handleCloseModalEditedTransaction = useCallback(() => {
    setTransactionIsBegging(null);
    setOpenModalEditedTransaction(false);
  }, []);

  const financesContextValues = useMemo(
    () => ({
      openModalNewBankAccount,
      handleOpenModalNewBankAccount,
      handleCloseModalNewBankAccount,
      showTotalValue,
      handleToggleShowTotalValue,
      bankAccountIsBegging,
      handleOpenModalEditBankAccount,
      handleCloseModalEditBankAccount,
      openModalEditBankAccount,
      openModalNewTransaction,
      typeTransaction,
      handleOpenModalNewTransaction,
      handleCloseModalNewTransaction,
      refSwiper,
      openModalEditedTransaction,
      transactionIsBegging,
      handleOpenModalEditedTransaction,
      handleCloseModalEditedTransaction,
      filters,
      handleChangeFilter,
    }),
    [
      openModalNewBankAccount,
      handleOpenModalNewBankAccount,
      handleCloseModalNewBankAccount,
      showTotalValue,
      handleToggleShowTotalValue,
      bankAccountIsBegging,
      handleOpenModalEditBankAccount,
      handleCloseModalEditBankAccount,
      openModalEditBankAccount,
      openModalNewTransaction,
      typeTransaction,
      handleOpenModalNewTransaction,
      handleCloseModalNewTransaction,
      refSwiper,
      openModalEditedTransaction,
      transactionIsBegging,
      handleOpenModalEditedTransaction,
      handleCloseModalEditedTransaction,
      filters,
      handleChangeFilter,
    ],
  );

  return (
    <FinancesContext.Provider value={financesContextValues}>
      {children}
    </FinancesContext.Provider>
  );
}

export function useFinancesContext() {
  if (!FinancesContext) {
    throw new Error('Context not mounted');
  }

  return useContext(FinancesContext);
}
