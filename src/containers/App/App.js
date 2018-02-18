import React from 'react';
import { Provider } from 'react-redux';

import Scheduler from 'components/Scheduler/Scheduler';
import { store } from '../../store/app.store';

export default function App() {
  return (
    <Provider store={store}>
      <Scheduler />
    </Provider>
  );
}
