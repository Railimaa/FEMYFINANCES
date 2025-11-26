import { Header } from '@ui/components/Header';

import { BankAccounts } from './components/BankAccounts/BankAccounts';
import { Fab } from './components/Fab/Fab';
import { EditBankAccountModal } from './components/Modals/EditBankAccountModal/EditBankAccountModal';
import { NewBankAccountModal } from './components/Modals/NewBankAccountModal/NewBankAccountModal';
import { Transactions } from './components/Transactions/Transactions';
import {
  FinancesContext,
  FinancesContextProvider,
} from './context/FinancesContext';

export function Home() {
  return (
    <FinancesContextProvider>
      <FinancesContext.Consumer>
        {({ bankAccountIsBegging }) => (
          <>
            <div className="flex flex-col h-screen ">
              <Header />
              <div className="flex flex-1 gap-4 flex-col lg:flex-row py-20 px-4">
                <div className="w-full h-full flex lg:w-[50%]">
                  <BankAccounts />
                </div>
                <div className="w-full h-full flex lg:w-[50%]">
                  <Transactions />
                </div>
              </div>

              <Fab />
            </div>
            <NewBankAccountModal />
            {bankAccountIsBegging && <EditBankAccountModal />}
          </>
        )}
      </FinancesContext.Consumer>
    </FinancesContextProvider>
  );
}
