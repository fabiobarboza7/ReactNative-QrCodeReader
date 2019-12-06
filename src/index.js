import React, { useReducer } from 'react';
import { StatusBar } from 'react-native';

import Routes from './routes';

import { Store } from './store';

import modules from './store/modules';

const { Provider } = Store;

export default function App() {
  const store = useReducer(modules, { cameraBottoms: {} });

  return (
    <Provider value={store}>
      <StatusBar barStyle="light-content" backgroundColor="#112" />
      <Routes />
    </Provider>
  );
}
