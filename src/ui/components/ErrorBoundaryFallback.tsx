import { routes } from '@app/router/routes';
import errorBoundary from '@ui/assets/images/errorBoundary.png';

import { Button } from './Button';

export function ErrorBoundaryFallBack() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-no-repeat bg-center flex flex-col items-center justify-center leading-6 text-[#fff]"
      style={{
        backgroundImage: `url(${errorBoundary})`,
      }}
    >
      <h1 className="text-3xl tracking-tighter font-bold text-center">
        Ops.. Ocorreu um erro inesperado
      </h1>
      <Button
        type="button"
        // eslint-disable-next-line no-return-assign
        size="lg"
        // eslint-disable-next-line no-return-assign
        onClick={() => (window.location.href = routes.home)}
      >
        Ir para Home
      </Button>
    </div>
  );
}
