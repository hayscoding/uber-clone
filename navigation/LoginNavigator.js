import React from 'react';
// import { Platform, Dimensions, } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';

const LoginStack = createStackNavigator({
  Links: LoginScreen,
});

LoginStack.navigationOptions = {
  title: 'Login',
  headerVisible: false,
};

export default createSwitchNavigator({
  Main: LoginStack,
});