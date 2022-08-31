/**
 * Enables support for toast notifications.
 *
 * import { useToast } from '@app/components/Setup/Setup';
 *
 * const toast = useToast();
 * toast.enqueue('Something good happened.', {
 *   variant: 'success',
 * });
 */
import * as React from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { isPlainObject } from 'lodash';

const ToastContext = React.createContext(null);

export function useToast() {
  return React.useContext(ToastContext);
}

function formatErrorMessage(error: Error) {
  return error.message;
}

function ToastWrapper(props: any) {
  const snackbar = useSnackbar();

  const enqueue = React.useMemo(() => {
    return (message, options) => {
      if (
        message instanceof Error ||
        (isPlainObject(message) && message.message)
      ) {
        console.error('Error displayed via toast notification:', message);
        options = options || {};
        options.variant = 'error';
        return snackbar.enqueueSnackbar(formatErrorMessage(message), options);
      } else {
        return snackbar.enqueueSnackbar(message, options);
      }
    };
  }, []);

  return (
    <ToastContext.Provider
      value={{
        enqueue,
        close: snackbar.closeSnackbar,
      }}
    >
      {props.children}
    </ToastContext.Provider>
  );
}

export function withToast(Component) {
  return (props) => (
    <SnackbarProvider maxSnack={3}>
      <ToastWrapper>
        <Component {...props} />
      </ToastWrapper>
    </SnackbarProvider>
  );
}
