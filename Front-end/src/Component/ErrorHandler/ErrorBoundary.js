import React from "react";

class ErrorBoundary extends React.Component {
  state = { error: "" };

  static getDerivedStateFromError(error) {
    return { error: error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by error boundary:", error, errorInfo);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.error) {
      return (
        <div className=" border-2 w-96 m-auto mt-10 p-5 text-center">
          <h2>Something went wrong.</h2>
          <h2>Please refresh the page or try again later.</h2>
          <button
            className="w-20 rounded-md p-1 mt-3 bg-blue-500"
            onClick={this.handleRefresh}
          >
            Refresh
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
