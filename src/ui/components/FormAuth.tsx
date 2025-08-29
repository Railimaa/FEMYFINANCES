import { LogIn } from 'lucide-react';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { Logo } from '@ui/assets/icons/Logo';

import { Button } from './Button';

interface IFormAuthProps {
  title: string;
  subTitle: string;
  navigateTo: string;
  children: ReactNode;
}

export function FormAuth({
  title,
  subTitle,
  navigateTo,
  children,
}: IFormAuthProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full items-center space-y-5 ">
      <div className="flex flex-col items-center justify-center gap-5">
        <Logo width={150} />

        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl text-center font-bold">{title}</h1>
          <Button
            variant="link"
            size="sm"
            className="text-muted-foreground"
            onClick={() => navigate(navigateTo)}
          >
            {subTitle}
            <LogIn className="text-muted-foreground" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-4 w-full max-w-[350px]">
        {children}
      </div>
    </div>
  );
}
