/**
 * Wraps the application up in a default MUI theme. Some components will complain if you don't do this.
 */
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({});

export function withTheme(Component) {
  return (props) => (
    <ThemeProvider theme={theme}>
      <Component {...props} />
    </ThemeProvider>
  );
}
