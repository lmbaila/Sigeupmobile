import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './storageKeys';

const api = axios.create({
  baseURL: 'https://api.sigeup.up.ac.mz/v1',
  headers: {
    Accept: 'application/json',
    'S-AppId': 'base64:cLTbevn5ay7Tae+1o2gu2FnXmAlVlg5MphC+CwKaqAw=',
  },
});

api.interceptors.request.use(async (config) => {
  const storedToken = await AsyncStorage.getItem(STORAGE_KEYS.token);
  if (storedToken) {
    const { access_token } = JSON.parse(storedToken);
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

let onUnauthorized = null;
export function setOnUnauthorized(handler) {
  onUnauthorized = handler;
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && onUnauthorized) {
      onUnauthorized();
    }
    return Promise.reject(error);
  }
);

export default api;
