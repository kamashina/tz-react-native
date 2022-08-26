import {NavigationContainer} from '@react-navigation/native';
import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import Home from './src/pages/Home';
import Driver from './src/pages/Driver';

export type RootStackParamList = {
  Home: undefined;
  Driver: {driverId: string; driverName: string};
};

const App: FC = () => {
  const RootStack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Home">
          <RootStack.Screen
            name="Home"
            component={Home}
            options={{title: 'Гонщики'}}
          />
          <RootStack.Screen
            name="Driver"
            component={Driver}
            options={({route}) => ({
              title: route.params.driverName,
            })}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
