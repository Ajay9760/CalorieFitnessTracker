import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import RootNavigator from './src/navigation';
import { COLORS } from './src/constants';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.surface}
      />
      <RootNavigator />
    </Provider>
  );
}

export default App;
