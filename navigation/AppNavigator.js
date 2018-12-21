import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import MainDrawerNavigator from './MainDrawerNavigator';
import TestLoginScreen from '../screens/TestLoginScreen';
import LoadingScreen from '../screens/LoadingScreen';
import VerifyScreen from '../screens/VerifyScreen';

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

const VerifyStack = createStackNavigator({
  Links: VerifyScreen,
});

VerifyStack.navigationOptions = {
  title: 'Loading',
  headerVisible: false,
};

const Config = {
	initialRouteName: 'Loading'
}

export default createSwitchNavigator({
	  Loading: LoadingStack,
	  Login: LoginStack,
	  Verify: VerifyStack,
	  Main: MainDrawerNavigator,
	},
	Config
);