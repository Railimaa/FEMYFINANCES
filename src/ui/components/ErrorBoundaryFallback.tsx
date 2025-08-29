import { Link } from 'react-router-dom';

import { routes } from '@app/router/routes';

export function ErrorBoundaryFallBack() {
  return (
    <div className="flex flex-col space-y-2">
      <h1>Error</h1>
      <small>Volte para home</small>
      <Link to={routes.home}>Ir para Home</Link>
    </div>
  );
}
