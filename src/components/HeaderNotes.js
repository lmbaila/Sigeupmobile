import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
// import { Container } from './styles';
import NavigationService from '../services/NavigationService';

const HeaderNotes = ({semesterInfo}) => {
  return (
    <View style={styles.container}>
      <View style = {{flexDirection:'row'}}
                accessible={true}
                accessibilityHint= {`${semesterInfo.semester}o Semestre de ${semesterInfo.period}`}  
      >
         <TouchableOpacity onPress={NavigationService.back()}><MaterialIcons name={'keyboard-arrow-left'} color={'#4A4A4B'} size={26}/></TouchableOpacity>
         <Text style={styles.title}>{`${semesterInfo.semester}o Semestre de ${semesterInfo.period}`}</Text>
      </View>
      <TouchableOpacity onPress={() => {NavigationService.navigate('Modalsetting')}} style={{margin: 8 }}><MaterialIcons name={'more-vert'} color={'#4A4A4B'} size={26}/></TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderBottomColor: '#CBCBDD',
    borderBottomWidth: 0.5
  },
  title: {
    fontWeight: 'bold',
    color: '#4A4A4B',
    fontSize: 20
  },
})


export default HeaderNotes;