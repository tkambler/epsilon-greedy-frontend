import * as React from 'react';

const loginState = React.createContext({
  user: null,
});

export function useLoginState() {
  return React.useState(loginState);
}
