import React, {useContext, useEffect} from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';
import {speckNormal} from '../helpers';
import * as RootNavigation from '../routes/RootNavigation';
const errorImg = require('../assets/error.png');
export default function NotFound404({title, info}) {
  
  //speckNormal('processando', talk);
  
  useEffect(() => {
    RootNavigation.isMountedRef.current = true;

    return () => (RootNavigation.isMountedRef.current = false);
  });
  return (
    <View style={styles.container} 
    accessible={true}
    accessibilityHint= {`${title}, ${info}`}
    >
      <Image source={errorImg} style={styles.errorImg}     
       accessible={true}
       accessibilityHint= {`imagem preta com fundo transparate, desenho de 404 `} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.info}>{info}</Text>
      <TouchableOpacity        
      accessible={true}
       accessibilityHint= {`Aceder a plataforma`}
        onPress= {()=> {RootNavigation.navigate('NavigatingOut')}} style = {styles.btnPortal}><Text style = {styles.txtPortal}>Aceder a plataformas</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorImg: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  btnPortal: {
    backgroundColor: '#707070',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,

  },
  txtPortal: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#fff'
  },
  title : {
    marginTop:5,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
    textAlign:'center',
    marginHorizontal: 30,
  },
  info : {
    marginTop:5,
    fontSize: 16,
    color: '#707070',
    textAlign:'center',
    marginHorizontal: 15,
  }
})