import { createContext, useState, useEffect, useCallback } from "react";

export const ToastContext = createContext([]);

function useEscapeKey(callback) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === "Escape") {
        callback(event);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback]);
}

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const handleNewToast = function (newToast) {
    const prevToasts = [...toasts];

    prevToasts.push({
      id: crypto.randomUUID(),
      ...newToast,
    });

    setToasts(prevToasts);
  };

  const handleDismissToast = function (id) {
    const updatedToasts = [...toasts].filter(
      (toastItem) => toastItem.id !== id
    );

    setToasts(updatedToasts);
  };

  function dismissAllToasts() {
    setToasts([]);
  }

  const handleEscape = useCallback(() => {
    dismissAllToasts();
  }, []);

  useEscapeKey(() => {
    handleEscape();
  });

  return (
    <ToastContext.Provider
      value={{
        toasts,
        handleNewToast,
        handleDismissToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}
export default ToastProvider;
