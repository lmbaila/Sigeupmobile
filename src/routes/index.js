import React, {useContext} from 'react';
import AuthContext from '../contexts/auth';
import AppRoutes from './App.route';
import AuthRoutes from './Auth.route';
import {StatusBar} from 'react-native';

const routes = () => {
  const { signed } = useContext(AuthContext);
  return (
    <>
    <StatusBar barStyle = "light-content"  backgroundColor = "#5C4DB1" translucent = {true}/>
    { signed? <AuthRoutes /> : <AppRoutes/>}
    </>
  )
}

export default routes;