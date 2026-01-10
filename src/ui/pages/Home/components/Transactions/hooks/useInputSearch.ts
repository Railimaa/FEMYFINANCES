import React, { useEffect, useRef, useState } from 'react';

type useInputSearchParams = {
  handleChangeSearchTransactionValue: (
    event: React.ChangeEvent<HTMLInputElement> | string,
  ) => void;
};

export function useInputSearch({
  handleChangeSearchTransactionValue,
}: useInputSearchParams) {
  const [visibleInputSearch, setVisibleInputSearch] = useState(false);
  const inputSearchRef = useRef<null | HTMLInputElement>(null);

  function handleToggleVisibleInputSearch() {
    setVisibleInputSearch((prevState) => !prevState);

    if (visibleInputSearch) {
      handleChangeSearchTransactionValue('');
    }
  }

  useEffect(() => {
    if (visibleInputSearch && inputSearchRef.current) {
      inputSearchRef.current.focus();
    }
  }, [visibleInputSearch]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;

      if (document.activeElement === inputSearchRef.current) {
        inputSearchRef.current?.blur();
        handleChangeSearchTransactionValue('');
        setVisibleInputSearch(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleChangeSearchTransactionValue]);

  return { visibleInputSearch, inputSearchRef, handleToggleVisibleInputSearch };
}
