import React from 'react';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import Login from '../pages/Login';


const SignRoutes = createSwitchNavigator(
  {
    Login,
  },
);
export default createAppContainer(SignRoutes);