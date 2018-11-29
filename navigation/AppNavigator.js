import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainDrawerNavigator from './MainDrawerNavigator';

export default createSwitchNavigator({
  Main: MainDrawerNavigator,
});