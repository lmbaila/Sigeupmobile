import React, {useEffect, useContext} from 'react';
import { View, Text, AccessibilityInfo } from 'react-native';
import styles from './styles';
import { colors } from '../../styles';
import  HeaderHome from '../../components/HeaderHome';
import UserInformation from '../../components/UserInformation';
import DoubleClick from 'react-native-double-tap';
import AuthContext from '../../contexts/auth';
import { FontAwesome5 } from '@expo/vector-icons';
import {speckNormal} from '../../helpers';
import { LinearGradient } from 'expo-linear-gradient';
export default function Home({navigation}) {
  const { talk, signOut, talkContext } = useContext(AuthContext); 
  useEffect(()=>{

    AccessibilityInfo.isScreenReaderEnabled().then( (screenReaderEnabled) => {
      if(screenReaderEnabled == true)
         talkContext(false);
    });
  }, [])
  return (
    <>
    <LinearGradient style={styles.container} colors = {[colors.primary, '#3b5998']}>
       
       <View style = {styles.scroll}>
       <HeaderHome navigation = {navigation}/>
          <UserInformation/>
        </View>
        <View style={{position: 'absolute', right: 30, top: 40}}>
          <DoubleClick singleTap= { async()=> {
            if(talk) { 
              
              speckNormal('pressione duas vezes para sair', talk);
              } else {
                await signOut(false);
              }
            }
              } doubleTap={ async() => {
                await signOut(false);
                }
              }><View style = {styles.logoutButton}><FontAwesome5 name={'sign-out-alt'} color={'#fff'} size={20}/><Text style = {styles.logoutText}>Sair</Text></View></DoubleClick>
        </View>
    </LinearGradient> 
    </>
  );
}

