import { LinkIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { routes } from '@app/router/routes';
import emptyState from '@ui/assets/images/empty-state.svg';
import { Button } from '@ui/components/Button';

export function EmptyChart() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center flex-col gap-2">
      <img src={emptyState} alt="empty" />
      <p className="text-muted-foreground text-sm text-center w-full max-w-[350px]">
        Nenhuma transação encontrada no ano selecionado. Que tal começarmos a
        cadastrar transações?
      </p>
      <Button variant="link" onClick={() => navigate(routes.home)}>
        Cadastrar
        <LinkIcon />
      </Button>
    </div>
  );
}
