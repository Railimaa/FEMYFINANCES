import { useEffect, useState } from 'react';

import { useFinancesContext } from '@ui/pages/Home/context/FinancesContext';

import { CategoryBankAccount } from '../../Modals/NewBankAccountModal/types/CategoryBankAccount';

import { useGetBankAccountsCategories } from './useGetBankAccountsCategories';

type useAccountOrColorDropdownParams = {
  value: CategoryBankAccount;
  onChange: (value: CategoryBankAccount) => void;
};

export function useAccountOrColorDropdown({
  value,
  onChange,
}: useAccountOrColorDropdownParams) {
  const { openModalNewBankAccount, openModalEditBankAccount } =
    useFinancesContext();

  const {
    bankAccountsCategories,
    isLoadingBankAccountsCategories,
    hasError,
    refetchBankAccountsCategories,
    isFetchingBankAccountsCategories,
  } = useGetBankAccountsCategories(
    openModalNewBankAccount || openModalEditBankAccount,
  );

  const [selecteValue, setSelectValue] = useState<CategoryBankAccount>({
    id: value.id ?? null,
    color: value.color ?? null,
    colorWithoutIcon: value.colorWithoutIcon ?? null,
    icon: value.icon ?? null,
    category: value.category ?? null,
  });

  const isTabIcon = !!selecteValue?.id;

  function handleChange(categoryWithIcon: CategoryBankAccount) {
    const value: CategoryBankAccount = {
      id: categoryWithIcon.id,
      color: categoryWithIcon.color,
      icon: categoryWithIcon.icon,
      colorWithoutIcon: categoryWithIcon.colorWithoutIcon,
      category: categoryWithIcon.category,
    };

    setSelectValue(value);
    onChange(value);
  }

  useEffect(() => {
    if (!bankAccountsCategories?.categories) return;

    const findValue = bankAccountsCategories?.categories.find(
      (category) => category.id === value.id,
    );

    if (findValue) {
      setSelectValue({
        id: findValue.id,
        color: findValue.color,
        icon: findValue.icon,
        colorWithoutIcon: null,
        category: findValue.category,
      });
    }
  }, [bankAccountsCategories, value.id]);

  return {
    selecteValue,
    handleChange,
    bankAccountsCategories,
    isLoadingBankAccountsCategories,
    hasError,
    refetchBankAccountsCategories,
    isFetchingBankAccountsCategories,
    isTabIcon,
    openModalEditBankAccount,
  };
}
