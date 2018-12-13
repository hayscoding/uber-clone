import React from 'react';
// import { Platform, Dimensions, } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import LoadingScreen from '../screens/LoadingScreen';

const LoginStack = createStackNavigator({
  Links: LoginScreen,
});

LoginStack.navigationOptions = {
  title: 'Login',
  headerVisible: false,
};

const LoadingStack = createStackNavigator({
  Links: LoadingScreen,
});

LoginStack.navigationOptions = {
  title: 'Loading',
  headerVisible: false,
};

export default createSwitchNavigator({
  Main: LoadingStack,
  Login: LoginStack,
});