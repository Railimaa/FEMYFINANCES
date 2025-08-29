import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from '@app/contexts/AuthProvider/AuthProvider';
import { ThemeProvider } from '@app/contexts/ThemeProvider';
import { ErrorBoundaryFallBack } from '@ui/components/ErrorBoundaryFallback';
import { Toaster } from '@ui/components/Sonner';

import { queryClient } from './app/libs/queryClient';
import { Router } from './app/router/Router';
import { ErrorBoundary } from './ui/components/ErrorBoundary';

export function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary fallback={<ErrorBoundaryFallBack />}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="dark">
            <AuthProvider>
              <Router />
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
