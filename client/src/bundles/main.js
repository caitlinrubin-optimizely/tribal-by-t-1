import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from 'reducers'
import thunkMiddleware from 'redux-thunk'

import WelcomeStep from 'steps/welcomeStep';
import PasswordStep from 'steps/passwordStep';
import InstallationStep from 'steps/installationStep';

import Wizard from 'components/Wizard';

import './main.scss';

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <Wizard>
          <WelcomeStep title="Welcome" />
          <PasswordStep title="Credentials" />
          <InstallationStep title="Installation" />
        </Wizard>
      </Provider>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('react-root'));
