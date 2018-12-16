import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import MainDrawerNavigator from './MainDrawerNavigator';
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