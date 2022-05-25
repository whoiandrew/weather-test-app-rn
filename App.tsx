import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';

import { AppStack } from './src/navigation';
import { store } from './src/store';

const App: React.FC = () => (
  <Provider store={store}>
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  </Provider>
);

export default App;
