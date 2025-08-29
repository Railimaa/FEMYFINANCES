/* eslint-disable react/state-in-constructor */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */

import { Component, ErrorInfo, ReactNode } from 'react';

interface IErrorBoundaryState {
  hasError: boolean;
}

interface IErrorBoundaryProps {
  fallback?: ReactNode;
  children: ReactNode;
}

export class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
