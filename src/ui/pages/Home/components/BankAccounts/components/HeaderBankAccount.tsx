import { cn } from '@app/utils/cn';
import { formatCurrency } from '@app/utils/formatCurrency';
import { Button } from '@ui/components/Button';
import { EyeIcon } from '@ui/icons/EyeIcon';

type HeaderBankAccountProps = {
  showTotalValue: boolean;
  handleToggleShowTotalValue: () => void;
  totalValueBankAccounts: number;
};

export function HeaderBankAccount({
  showTotalValue,
  handleToggleShowTotalValue,
  totalValueBankAccounts,
}: HeaderBankAccountProps) {
  return (
    <div className="flex flex-col gap-2">
      <small className="font-normal text-base/6 tracking-tighter">
        Saldo total
      </small>

      <div className="flex items-center gap-2 font-bold text-3xl/4">
        <span className={cn('', !showTotalValue && 'blur-md')}>
          {formatCurrency(totalValueBankAccounts)}
        </span>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleToggleShowTotalValue}
        >
          <EyeIcon open={showTotalValue} />
        </Button>
      </div>
    </div>
  );
}
