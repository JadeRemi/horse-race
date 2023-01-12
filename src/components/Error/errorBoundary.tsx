import React, { Component, ErrorInfo, ReactNode } from "react";
import { ErrorMessage } from './errorMessage';

interface ErrorProps {
  children: ReactNode;
}

interface ErrorState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorProps, ErrorState> {
  public state: ErrorState = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): ErrorState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Incorrect parameters:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorMessage />;
    }

    return (
        <>
            {this.props.children}
        </>
    );
  }
}