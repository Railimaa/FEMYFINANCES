import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type ModalProviderContextProps = {
  registerStack: (id: string) => void;
  unRegisterStack: (id: string) => void;
  isTopStack: (id: string) => boolean;
};

const ModalProviderContext = createContext({} as ModalProviderContextProps);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [stack, setStack] = useState<string[]>([]);

  const registerStack = useCallback((id: string) => {
    setStack((prevState) => [...prevState, id]);
  }, []);

  const unRegisterStack = useCallback((id: string) => {
    setStack((prevState) => prevState.filter((stackId) => stackId !== id));
  }, []);

  const isTopStack = useCallback(
    (id: string) => stack[stack.length - 1] === id,
    [stack],
  );

  const values = useMemo(
    () => ({
      registerStack,
      unRegisterStack,
      isTopStack,
    }),
    [registerStack, unRegisterStack, isTopStack],
  );

  return (
    <ModalProviderContext.Provider value={values}>
      {children}
    </ModalProviderContext.Provider>
  );
}

export function useModalProvider() {
  const ctx = useContext(ModalProviderContext);

  if (!ctx) {
    throw new Error('useModalManager precisa estar dentro do ModalProvider');
  }

  return ctx;
}
