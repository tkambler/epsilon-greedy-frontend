/**
 * Loads the top application bar for all authenticated routes.
 */
import * as React from 'react';
import { useLoginState } from './State';

export function withNav(Component) {
  return (props) => {
    const state = useLoginState();
    return (
      <React.Fragment>
        <div
          style={{
            padding: 10,
          }}
        >
          <Component {...props} />
        </div>
      </React.Fragment>
    );
  };
}
