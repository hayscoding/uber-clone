import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainDrawerNavigator from './MainDrawerNavigator';
import LoginNavigator from './LoginNavigator';

const Config = {
	initialRouteName: 'Login'
}

export default createSwitchNavigator({
	  Main: MainDrawerNavigator,
	  Login: LoginNavigator,
	},
	Config
);