/**
 * Wraps a context around the app that provides essential global state (e.g. Does the current user have an active
 * session? Who are they?) To access this state, call the `useLoginState()` hook that is exported
 * from: @app/components/Setup/Setup
 */
import * as React from 'react';
import useReducerX from '@0y0/use-reducer-x';
import thunkMiddleware from 'redux-thunk';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation, useHistory } from '@app/lib/hooks';

import { axios } from '@app/axios';

const LoginStateContext = React.createContext(null);

export function useLoginState() {
  return React.useContext(LoginStateContext);
}

export const actions = {
  logout: (toast) => {
    return async (dispatch, getState) => {
      await axios({
        method: 'DELETE',
        url: '/session',
      });
      dispatch({
        type: 'signout',
      });
      toast.enqueue('You have signed out.', {
        variant: 'success',
      });
    };
  },
  getSession: () => {
    return async (dispatch, getState) => {
      try {
        const { data: session } = await axios({
          method: 'GET',
          url: '/session',
        });
        dispatch({
          type: 'initComplete',
          payload: {
            user: session,
          },
        });
      } catch (err) {
        dispatch({
          type: 'initComplete',
          payload: {
            user: null,
          },
        });
      }
    };
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'setUser':
      return {
        ...state,
        user: action.payload.value,
      };
    case 'initComplete':
      return {
        ...state,
        user: action.payload.user || null,
        initialized: true,
      };
    case 'signout':
      return {
        user: null,
        initialized: true,
      };
    default:
      throw new Error();
  }
}

export function withState(Component) {
  return (props) => {
    const location = useLocation();
    const history = useHistory();
    const [state, dispatch] = useReducerX(
      reducer,
      {
        user: null,
        initialized: false,
      },
      [thunkMiddleware]
    );
    React.useEffect(() => {
      if (!state.initialized) {
        dispatch(actions.getSession());
      }
    }, [state.initialized]);
    React.useEffect(() => {
      if (!state.initialized) {
        return;
      }
      if (
        state.user &&
        location.pathname !== '/create' &&
        location.pathname.indexOf('/whiteboards') !== 0
      ) {
        history.push('/whiteboards');
      }
    }, [state.initialized, state.user]);
    if (!state.initialized) {
      return <CircularProgress />;
    }
    return (
      <LoginStateContext.Provider
        value={{
          ...state,
          dispatch,
        }}
      >
        <Component {...props} />
      </LoginStateContext.Provider>
    );
  };
}
