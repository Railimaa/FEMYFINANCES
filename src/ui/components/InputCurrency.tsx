import { NumericFormat } from 'react-number-format';

type InputCurrencyProps = {
  value: number;
  onChange: (value: number) => void;
  isLoading?: boolean;
  disabled?: boolean;
};

export function InputCurrency({
  value,
  onChange,
  isLoading,
  disabled,
}: InputCurrencyProps) {
  return (
    <NumericFormat
      value={value}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={0}
      allowNegative={false}
      inputMode="numeric"
      onValueChange={(values) => {
        onChange(values.floatValue ?? 0);
      }}
      className=" outline-none border-none font-bold text-[32px] -tracking-[-1px]  bg-background text-primary w-full"
      id="initialBalance"
      disabled={isLoading ?? disabled}
    />
  );
}
