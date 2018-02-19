// https://lab.lectrum.io/hw/todo/docs/#/docs/documentation-3

// Core
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';

// Instruments
import './theme/reset.css';

// App
import { store } from './store/app.store';
import App from './containers/App/App';

render(
  <Provider store={store}>
    <section>
      <App />
      <ReduxToastr />
    </section>
  </Provider>,
  document.getElementById('root'),
);
