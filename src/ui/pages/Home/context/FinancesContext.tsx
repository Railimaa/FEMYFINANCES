import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { BankAccount } from '../components/BankAccounts/types/BankAccount';

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
};

export const FinancesContext = createContext({} as FinancesContextValues);

export function FinancesContextProvider({ children }: { children: ReactNode }) {
  const [openModalNewBankAccount, setOpenModalNewBankAccount] =
    useState<boolean>(false);
  const [openModalEditBankAccount, setOpenModalEditBankAccount] =
    useState<boolean>(false);

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
