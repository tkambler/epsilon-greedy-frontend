import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Setup } from '@app/components/Setup/Setup';
import { Scenario1, Scenario2 } from '@app/components/Scenario/Scenario';

function App(): React.ReactElement {
  return (
    <Setup>
      <Scenario1 />
      <br />
      <br />
      <Scenario2 />
    </Setup>
  );
}

ReactDOM.render(<App />, document.getElementById('app-root'));
