import React from 'react';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { queryClient, asyncStoragePersister } from './src/services/queryClient';
import { USE_FAKE_DATA } from './src/config';
import Routes from './src/routes';
import { AuthProvider } from './src/contexts/auth';

if (USE_FAKE_DATA) {
  // eslint-disable-next-line global-require
  require('./src/services/mocks/setup').setupFakeApi();
}

export default function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </PersistQueryClientProvider>
  );
}
