import React, {createContext, useState, useEffect} from 'react';
import {View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as auth from '../services/auth';
import {colors} from '../styles/index';
import api from '../services/api';
import {speckNormal} from '../helpers';
const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingContext, setLoadingContext] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [exameNote, setExameNote] = useState(false);
  const [talk, setTalk] = useState(false);

 
  useEffect(()=> {
    async function loadStoragedDate(){
       const storageUser  =  await  AsyncStorage.getItem('@SigeupMob:user');
       const storageToken =  await AsyncStorage.getItem('@SigeupMob:token');
       const storageTalk = await AsyncStorage.getItem('@SigeupMob:talk');
        if(storageTalk=="false" || storageTalk == null)
          setTalk(false); 
        else
         setTalk(true); 
       const Token = JSON.parse(storageToken);
       if(storageToken && storageUser){
        api.defaults.headers.Authorization = `Bearer ${Token.access_token}`;
         setUser(JSON.parse(storageUser));
       }
       setLoading(false);
    }
    loadStoragedDate();
  }, []);
  if(loading){
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colors.primary}/>
      </View>
    );
  }
  async function signIn(username, password){
    if(username == null || password == null) {
      setErrorMessage('Preecha todos os campos!');
      speckNormal('Preecha todos os campos!', talk)
      return;
    } 
      try{
        setLoadingContext(true);
        const response = await auth.signin(username, password);
        setUser(response.data.user);
        api.defaults.headers.Authorization = `Bearer ${response.data.access_token}`;
        
        await AsyncStorage.setItem('@SigeupMob:user', JSON.stringify(response.data.user));
        await AsyncStorage.setItem('@SigeupMob:token', JSON.stringify({access_token: response.data.access_token, expires_at:response.data.expires_at}));
        setErrorMessage('');
        setLoadingContext(false);
      }catch(err){
        if(err.request.status == 0 && err.request._requestId == null) {
          setErrorMessage('serviço temporariamente indisponivel!');
          speckNormal('serviço temporariamente indisponivel!', talk);
        }else if(err.request.status == 404)  {
          setErrorMessage('Usuário ou Senha inválida!');
          speckNormal('Usuário ou Senha inválida!', talk);
        }
        
        setLoadingContext(false);
      }
  }
   async function signOut () {
    
    try{
      setUser(null);
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
    }catch(err){
      setUser(null);
    }
  
  }
  function exameView(change){
    setExameNote(change)
  }
  async function talkContext(change){
    setTalk(change);
    await AsyncStorage.setItem('@SigeupMob:talk', change.toString());
  }
  return (
     <AuthContext.Provider value={{signed: !!user,  user, signIn, exameNote, signOut, exameView, talk, talkContext, errorMessage, loadingContext}}>
       {children}
     </AuthContext.Provider>
  );
}
export default AuthContext;