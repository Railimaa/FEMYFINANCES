import { ptBR } from 'date-fns/locale';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@app/utils/cn';
import { formatDate } from '@app/utils/formatDate';
import { Calendar } from '@ui/components/Calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@ui/components/Popover';

type DatePickerProps = {
  value: Date;
  onChange: (value: Date) => void;
  isLoading?: boolean;
};

export function DatePicker({ value, onChange, isLoading }: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          'w-full border rounded-md  h-9 px-3',
          !value && 'py-2',
          isLoading && 'cursor-not-allowed opacity-50',
        )}
        id="date"
        disabled={isLoading}
      >
        <div className="flex items-center justify-between">
          {value ? (
            <span>{formatDate(value)}</span>
          ) : (
            <span className="text-sm text-muted-foreground">Data</span>
          )}

          <ChevronDown className=" size-4 text-muted-foreground opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="z-[1005]" side="top" align="center">
        <Calendar
          mode="single"
          defaultMonth={value}
          selected={value}
          onSelect={(value) => {
            onChange(value!);
            setOpen(false);
          }}
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  );
}
