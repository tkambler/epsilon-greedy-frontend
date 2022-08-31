/**
 * Initializes react-router.
 */
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

export function withRouter(Component) {
  return (props) => {
    return (
      <BrowserRouter basename={props.basename || '/'}>
        <Component {...props} />
      </BrowserRouter>
    );
  };
}
