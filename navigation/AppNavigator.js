import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainDrawerNavigator from './MainDrawerNavigator';
import LoginNavigator from './LoginNavigator';

export default createSwitchNavigator({
  Main: MainDrawerNavigator,
  Login: LoginNavigator,
});