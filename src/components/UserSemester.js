
import React, {useEffect, useState, useContext} from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, FlatList, ActivityIndicator} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as apiSemester from '../services/semester';
import {colors} from '../styles/index';
import * as RootNavigation from '../routes/RootNavigation';
import AuthContext from '../contexts/auth';
import {speckNormal} from '../helpers';
import DoubleClick from 'react-native-double-tap';
import AsyncStorage from '@react-native-async-storage/async-storage';



const {width} = Dimensions.get('window');
const UserSemester = () => {
  const [semester, setsemester] = useState([]);
  const [loading, setloading] = useState(true);
  const { talk, signOut } = useContext(AuthContext); 

  useEffect(() => {
    RootNavigation.isMountedRef.current = true;
    getSemester();
    return () => (RootNavigation.isMountedRef.current = false);
  }, []);
  
  async function getSemester(){
    
    try{
      speckNormal('processando', talk);
      const response = await apiSemester.semester();
      await AsyncStorage.setItem('@SigeupMob:semester', JSON.stringify(response.data['data']));
      const sem = JSON.parse(await AsyncStorage.getItem('@SigeupMob:semester')) ;
      setsemester(sem); 
    }catch(error){
        if(error.response.status == 401) { //token invalido - nao autorizacao
          await signOut();
        } 
    }  
    setloading(false);
  }
  return (
    <>
    { loading? <ActivityIndicator size="large" color={colors.primary} />:
      <FlatList 
        data={semester}
        style = {styles.container}
        keyExtractor= {(item) => (item._id)}
        contentContainerStyle = {{justifyContent:'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}
        // onRefresh={getSemester()}
        // refreshing= {true}
        renderItem ={ ({item}) => (
            <DoubleClick
            singleTap = {() => {
              if(talk){
                speckNormal(`${item.semester}º semestre de ${item.period}`, talk);
              }else {
                RootNavigation.navigate('Notes', {
                  _id: item._id,
                  period: item.period,
                  semester: item.semester
                })
              }

            }}
            doubleTap={() => {
             RootNavigation.navigate('Notes', {
                _id: item._id,
                period: item.period,
                semester: item.semester
              });
            }}
            delay={190}
            >
            <View style={styles.buttonItem} 
             >
              <Text style={styles.textButtonItem}>{`${item.semester}º semestre de ${item.period}`}</Text>
              <MaterialIcons name={'chevron-right'} color={'#fff'} size={24}/>
            </View>   
            </DoubleClick>
        )} 
      /> 
    }
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonItem: {
    width: width - 15,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  shimmerComponent: {
    width: width - 15,
    height: 50,
    alignSelf : 'center',
    borderRadius: 10,
   // paddingHorizontal: 20,
    marginVertical: 5,

  },
  textButtonItem: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold'
  }

})
export default UserSemester;