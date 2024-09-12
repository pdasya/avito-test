import React, { Component, ReactNode } from "react";
import { toast } from "react-toastify";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    toast.error(`Ошибка пойманная ErrorBoundary:${error} ${errorInfo}`);
  }

  resetError = () => {
    this.setState({ hasError: false, errorMessage: null });
  };

  render() {
    const { hasError, errorMessage } = this.state;

    if (hasError) {
      return (
        <div>
          <h2>Что-то пошло не так.</h2>
          <p>{errorMessage}</p>
          <button onClick={this.resetError}>Попробовать снова</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
