import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet,  Image, Text, TouchableWithoutFeedback, View, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../styles';
import AuthContext from '../contexts/auth';
import {speckNormal} from '../helpers';
const avatar = require('../assets/avatar.png');

const HeaderHome = ({navigation}) => {
  const {user, talk} = useContext(AuthContext);
  const [name, setname] = useState();
  useEffect(() => {
    modifyName();

  });
  function modifyName(){
    const [firstname, lastname] = user.full_name.toLowerCase().split(' ');
    const newfirstname =  firstname.charAt(0).toUpperCase() + firstname.slice(1);
    // const newlastname = lastname.charAt(0).toUpperCase() + lastname.slice(1);
    setname(newfirstname[0]+ ''+lastname);
  }
  return (
    <>
    {/* <TouchableWithoutFeedback onFocus = {() => {speckNormal(`Perfil do estudante ${name}, Código nº ${user._id}`, talk)}} > */}
        <View style = {styles.container} 
         accessible={true}
         accessibilityHint= {`Perfil do estudante ${name}, Código nº ${user._id}`}
        onResponderGrant={()=>{speckNormal(`Perfil do estudante ${name}, Código nº ${user._id}`, talk)}}>
          <Text style={styles.profile}>Perfil</Text>
          <Image source={avatar} style={styles.avatar} />
          <Text style={styles.username}>{name}</Text>
          <Text style={styles.code}>{`Código nº. ${user._id}`}</Text>
        </View>
     {/* </TouchableWithoutFeedback> */}
     </>
  );
}

const styles = StyleSheet.create({
  container:{
    //justifyContent: 'center',
    alignItems: 'center',
    top: -80,
    right: width/4,
    position:'absolute',
    zIndex: 2,
  //backgroundColor: '#'
  },
  imageProfileContent: {
  //  flex:1,
    resizeMode: "cover",
  //  justifyContent: "center"
  },
  profile: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  avatar: {
  //  marginTop: 20,
    height: 80,
    width: 80,
    resizeMode: 'cover',
    borderRadius: 40,
    borderColor: colors.white,
    borderWidth: 4,
  },
  username: {
   // marginTop: 5,
    fontSize: 18,
    color: '#CBCBCB',
    fontWeight: 'bold'
  },
  code: {
    fontSize: 14,
   // marginTop: 5,
    color: '#CBCBCB',
    fontWeight: 'bold',

  },
  setting: {
    position: 'absolute',
    right: 30,
    top: 40
  },

});

export default HeaderHome;