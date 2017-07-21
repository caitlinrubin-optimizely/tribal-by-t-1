import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from 'reducers'
import thunkMiddleware from 'redux-thunk'

import Layout from 'components/layout';

import './main.scss';

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('react-root'));
