/**
 * This component takes care of all of the up-front setup / initializing steps that are required by the
 * app (e.g. loading default stylesheets, fetching session data, etc...). Just wrap your child nodes up in
 * Setup, and you should be good to go.
 */
import { withRouter } from './Router';
import { withTheme } from './Theme';
import { withToast } from './Toast';
import { withState } from './State';
import { withNav } from './Nav';
import { compose } from 'lodash/fp';
export { useLoginState, actions as sessionActions } from './State';
export { useToast } from './Toast';
import './styles.scss';

export const Setup = compose(
  withRouter,
  withState,
  withTheme,
  withToast,
  withNav
)((props) => props.children);
