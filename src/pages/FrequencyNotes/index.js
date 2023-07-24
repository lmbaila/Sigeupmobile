import React, {useEffect} from 'react';
import { View, Text } from 'react-native';
import UserSemester from '../../components/UserSemester';
import styles from './styles';

export default function FrequencyNotes () {
 
  return (
    <>
    <View style={styles.header}
     accessible={true}
     accessibilityHint= {'Semestre, Seleciona o semestre para visualizar as notas de  Frequência'}
    >
      <Text style={styles.title}>Semestre</Text>
      <Text style={styles.description}>Seleciona o semestre para visualizar as notas de  Frequência!</Text>
    </View>
     <UserSemester />
   </>
  );
}

