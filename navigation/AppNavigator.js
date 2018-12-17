import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import MainDrawerNavigator from './MainDrawerNavigator';
import TestLoginScreen from '../screens/TestLoginScreen';
import LoadingScreen from '../screens/LoadingScreen';

const LoginStack = createStackNavigator({
  Links: TestLoginScreen,
});

LoginStack.navigationOptions = {
  title: 'Login',
  headerVisible: false,
};

const LoadingStack = createStackNavigator({
  Links: LoadingScreen,
});

LoadingStack.navigationOptions = {
  title: 'Loading',
  headerVisible: false,
};

const Config = {
	initialRouteName: 'Loading'
}

export default createSwitchNavigator({
	  Loading: LoadingStack,
	  Login: LoginStack,
	  Main: MainDrawerNavigator,
	},
	Config
);