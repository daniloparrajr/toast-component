import { createContext, useState, useEffect, useCallback } from "react";

export const ToastContext = createContext([]);

function useEscapeKey(callback) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        callback(event);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback]);
}

function ToastProvider({children}) {
  const [toasts, setToasts] = useState([]);

  const handleEscape = useCallback(() => {
    handleDismissAllToast();
  }, []);

  useEscapeKey(()=> {
    handleEscape();
  });

  const handleNewToast = function( newToast ) {
    const prevToasts = [...toasts];

    prevToasts.push( {
      id: crypto.randomUUID(),
      hidden: false,
      ...newToast
    } );

    setToasts(prevToasts);
  }

  const handleDismissToast = function(id) {
    const updatedToasts = [...toasts].map(toastItem => {
      const currentToast = {...toastItem};

      if (currentToast.id === id) {
        currentToast.hidden = true;
      }

      return currentToast;
    });

    setToasts(updatedToasts);
  }

  const handleDismissAllToast = function() {
    const prevToasts = [...toasts];

    prevToasts.map(currentToast => {
      return {...currentToast, hidden: true};
    });

    setToasts(prevToasts);
  }

  return (
    <ToastContext.Provider
      value={{
        toasts,
        handleNewToast,
        handleDismissToast
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}
export default ToastProvider;