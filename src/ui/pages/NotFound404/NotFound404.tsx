import { useNavigate } from 'react-router-dom';

import { routes } from '@app/router/routes';
import ImageNotFound404 from '@ui/assets/images/NotFound404Image.jpg';
import { Button } from '@ui/components/Button';

export function NotFound404() {
  const navigate = useNavigate();

  return (
    <div
      className="w-full min-h-screen bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${ImageNotFound404})`,
        backgroundSize: '80%',
      }}
    >
      <div className="flex h-screen justify-center items-center">
        <Button
          size="lg"
          className="bg-chart-4"
          onClick={() => navigate(routes.home)}
        >
          Ir para Home
        </Button>
      </div>
    </div>
  );
}
