import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import reducer from './redux';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Preview from './component/preview/Preview';
import Home from './component/Home';

const store = createStore(reducer, compose(
  applyMiddleware(thunk),
));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/preview" component={Preview} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
