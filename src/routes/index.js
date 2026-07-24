import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import AuthContext from '../contexts/auth';
import AppRoutes from './App.route';
import AuthRoutes from './Auth.route';
import { OfflineBanner, FakeDataBanner } from '../design-system';
import { USE_FAKE_DATA } from '../config';

const Routes = () => {
  const { signed } = useContext(AuthContext);
  return (
    <>
      <StatusBar style="light" translucent />
      {USE_FAKE_DATA && <FakeDataBanner />}
      {signed && <OfflineBanner />}
      {signed ? <AuthRoutes /> : <AppRoutes />}
    </>
  );
};

export default Routes;
