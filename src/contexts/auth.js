import React, { createContext, useState, useEffect, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as auth from '../services/auth';
import { setOnUnauthorized } from '../services/api';
import { STORAGE_KEYS } from '../services/storageKeys';
import { colors } from '../design-system';
import { speckNormal } from '../helpers';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingContext, setLoadingContext] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [exameNote, setExameNote] = useState(false);
  const [talk, setTalk] = useState(false);

  const clearSession = useCallback(async () => {
    setUser(null);
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys.filter((key) => key !== STORAGE_KEYS.talk));
  }, []);

  useEffect(() => {
    setOnUnauthorized(() => {
      clearSession();
    });
  }, [clearSession]);

  useEffect(() => {
    async function loadStoragedDate() {
      const storageUser = await AsyncStorage.getItem(STORAGE_KEYS.user);
      const storageToken = await AsyncStorage.getItem(STORAGE_KEYS.token);
      const storageTalk = await AsyncStorage.getItem(STORAGE_KEYS.talk);
      setTalk(storageTalk === 'true');
      if (storageToken && storageUser) {
        setUser(JSON.parse(storageUser));
      }
      setLoading(false);
    }
    loadStoragedDate();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  async function signIn(username, password) {
    if (!username || !password) {
      setErrorMessage('Preencha todos os campos!');
      speckNormal('Preencha todos os campos!', talk);
      return;
    }
    try {
      setLoadingContext(true);
      const response = await auth.signin(username, password);
      setUser(response.data.user);
      await AsyncStorage.setItem(STORAGE_KEYS.user, JSON.stringify(response.data.user));
      await AsyncStorage.setItem(
        STORAGE_KEYS.token,
        JSON.stringify({ access_token: response.data.access_token, expires_at: response.data.expires_at })
      );
      setErrorMessage('');
    } catch (err) {
      if (!err.response) {
        setErrorMessage('Serviço temporariamente indisponível!');
        speckNormal('Serviço temporariamente indisponível!', talk);
      } else if (err.response.status === 404) {
        setErrorMessage('Utilizador ou senha inválida!');
        speckNormal('Utilizador ou senha inválida!', talk);
      } else {
        setErrorMessage('Não foi possível iniciar sessão!');
        speckNormal('Não foi possível iniciar sessão!', talk);
      }
    } finally {
      setLoadingContext(false);
    }
  }

  async function signOut() {
    try {
      await auth.signout();
    } catch (err) {
      // ignora falhas de rede: a sessão local é sempre terminada abaixo
    }
    await clearSession();
  }

  function exameView(change) {
    setExameNote(change);
  }

  async function talkContext(change) {
    setTalk(change);
    await AsyncStorage.setItem(STORAGE_KEYS.talk, change.toString());
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        exameNote,
        signOut,
        exameView,
        talk,
        talkContext,
        errorMessage,
        loadingContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
