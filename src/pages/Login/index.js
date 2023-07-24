import React, {useState, useEffect, useRef, useContext} from 'react';

import { View , Alert, AccessibilityInfo, Text, SafeAreaView, KeyboardAvoidingView, Keyboard,TextInput, TouchableOpacity, Image, ActivityIndicator, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import {fonts, colors, metrics} from '../../styles';

const logo = require('../../assets/logo/logo.png');
import {speckNormal} from '../../helpers';
import AuthContext from '../../contexts/auth';
import DoubleClick from 'react-native-double-tap';
export default function Login({}) {
  const {signIn, talkContext, errorMessage, loadingContext, talk} = useContext(AuthContext);
  useEffect(()=>{
    AccessibilityInfo.isScreenReaderEnabled().then( (screenReaderEnabled) => {
      if(screenReaderEnabled == true)
         talkContext(false);
    });
  }, []); 
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const passwordInputRef = useRef();
  function handleSignin(){
    Keyboard.dismiss();
    speckNormal('Processando', talk);
    signIn(username, password);
    speckNormal('Bem-Vindo, tela inicial', talk);
  }
  function hadleTalk(talk){
    if(talk == true){
        talkContext(!talk);
        speckNormal('narador de tela inactivo', true);
    }else {
      talkContext(!talk);
      speckNormal('narador de tela activo', true);
    }
  }
  return (
    <>
   <TouchableWithoutFeedback delayLongPress = {3000} onPress={Keyboard.dismiss} onLongPress = {() =>hadleTalk(talk)}>
        <KeyboardAvoidingView  behavior='padding' style={{ flex: 1 }}>
          <SafeAreaView style={styles.container}>
          <Image source={logo} style={styles.logo}/>
          <Text style={styles.txterrorMessage} 
               accessible={true}
               accessibilityHint= {`${errorMessage}`}
          >{errorMessage}</Text>
          <View style={styles.form}>
            <View style={styles.contentInput}>
              <MaterialIcons name={'person'} color={ colors.regular} size={24} style={styles.icon}/>
              <TextInput style={[styles.input]} 
                                placeholder = 'Usuario' 
                                placeholderTextColor={colors.regular}
                                autoCapitalize="none"
                                keyboardType="numbers-and-punctuation"
                                maxLength={13}
                                returnKeyType="next"
                                onSubmitEditing={() => passwordInputRef.current.focus()}
                                accessible={true}
                                accessibilityHint= {`digite o Código de estudante`}
                          onChangeText={text => setUsername(text)}
                          onFocus = {() => {    
                              speckNormal('digite o Código de estudante', talk);
                            }
                           
                          }
                                />
            </View>
            <View style={styles.contentInput}>
              <MaterialIcons name={'lock'} color={colors.regular} size={24} style={styles.icon}/>
              <TextInput style={[styles.input]} 
                        placeholder = 'Senha'placeholderTextColor={colors.regular}
                        autoCapitalize="none"
                        autoCorrect={false}  
                        maxLength={30}
                        secureTextEntry={true}
                        returnKeyType="send"
                        onChangeText={text => setPassword(text)}
                        onSubmitEditing={handleSignin}
                        onFocus = {() => {speckNormal('digite a senha', talk);}}
                        ref={passwordInputRef}
                        accessible={true}
                        accessibilityHint= {`digite a senhas`}
                        />
            </View>
            { !loadingContext?
            <DoubleClick singleTap = {() =>{
              if(talk){
                speckNormal('botão entrar, precione 2 vezes para autenticar', talk);
              }else{
                handleSignin();
              } 
            } 
            } doubleTap = {handleSignin}> 
                <View style={styles.botton} 
                  accessible={true}
                  accessibilityHint= {`botão entrar, precione 2 vezes para autenticar`}
                >
                  <Text style={styles.textBotton}>ENTRAR</Text> 
                </View>
             </DoubleClick>:

            <View style={styles.botton}
            accessible={true}
            accessibilityHint= {`Processando`}     
            > 
            <ActivityIndicator size="small" color="#fff"/>
            </View>
            }
          </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  </>
  );
}
