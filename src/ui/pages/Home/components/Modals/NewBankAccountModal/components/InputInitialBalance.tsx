import { NumericFormat } from 'react-number-format';

type InputInitialBalanceProps = {
  value: number;
  onChange: (value: number) => void;
  isLoading?: boolean;
};

export function InputInitialBalance({
  value,
  onChange,
  isLoading,
}: InputInitialBalanceProps) {
  return (
    <NumericFormat
      value={value}
      thousandSeparator="."
      decimalSeparator=","
      allowNegative
      defaultValue={0}
      onValueChange={(value) => {
        onChange(value.floatValue ?? 0);
      }}
      className=" outline-none border-none font-bold text-[32px] -tracking-[-1px]  bg-background text-primary w-full"
      id="initialBalance"
      disabled={isLoading}
    />
  );
}
