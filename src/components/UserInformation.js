import React, {useContext} from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import AuthContext from '../contexts/auth';
import {speckNormal} from '../helpers';
const UserInformation = () => {
  const {user, talk} = useContext(AuthContext);

  return (
    <View>
      <TouchableWithoutFeedback 
       onPress = {() => {
         speckNormal(`Nome ${user.full_name}`, talk);
       }}
       accessible={true}
       accessibilityHint= {`Nome ${user.full_name}`}
      >
       <View style={styles.contentItem}

       >
         <Text style={styles.labelItem}>Nome</Text>
         <Text style={styles.itemInfo}>{ user? user.full_name : ""}</Text>
       </View>
       </TouchableWithoutFeedback>
       <TouchableWithoutFeedback
          onPress = {() => {
            speckNormal(`Regime ${user.regime.name}`, talk);
          }}
          accessible={true}
          accessibilityHint= {`Regime ${ user.regime.name}`}
       >
        <View style={styles.contentItem}>
          <Text style={styles.labelItem}>Regime</Text>
          <Text style={styles.itemInfo}>{ user? user.regime.name : ""}</Text>
        </View>
       </TouchableWithoutFeedback>
       <TouchableWithoutFeedback
            accessible={true}
            accessibilityHint= {`Nivel ${user.grade}º`}
           onPress = {() => {
            speckNormal(`Nivel ${user.grade}º`, talk);
          }}
       >
        <View style={styles.contentItem}>
          <Text style={styles.labelItem}>Nível</Text>    
          <Text style={styles.itemInfo}>{user? `${user.grade}º` : ""}</Text>
        </View>
       </TouchableWithoutFeedback>
       <TouchableWithoutFeedback
           onPress = {() => {
            speckNormal(`Curso ${user.course.name}`, talk);
          }}  
          accessible={true}
          accessibilityHint= {`Curso de ${user.course.name}`}    
       >
        <View style={styles.contentItem}>
          <Text style={styles.labelItem}>Curso</Text>    
          <Text style={styles.itemInfo}>{user? user.course.name : ""}</Text>
        </View>
       </TouchableWithoutFeedback>
       <TouchableWithoutFeedback
          onPress = {() => {
            speckNormal(`Faculdade ${user.course.faculty_id.trim()}`, talk);
          }}  
          accessible={true}
          accessibilityHint= {`Faculdade ${user.course.faculty_id.trim()}`}    
       >
        <View style={styles.contentItem}>
          <Text style={styles.labelItem}>Faculdade</Text>    
          <Text style={styles.itemInfo}>{user? user.course.faculty_id.trim() : ""}</Text>
        </View> 
       </TouchableWithoutFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    backgroundColor: '#FFFF',
    marginVertical: 2, 
    height: 50,
    margin: 20
  },
  labelItem: {
    fontSize: 16,
    color: '#777777',
  },
  itemInfo: {
    fontSize: 18,
    color: '#4A4A4B',
    fontWeight: 'bold'
  },

})
export default UserInformation;