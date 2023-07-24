import React, {useEffect, useContext} from 'react';
import { View, Text, AccessibilityInfo } from 'react-native';
import styles from './styles';
import CardSubscription from '../../components/CardSubscription';
import AuthContext from '../../contexts/auth';
function Subscription(){
  const {talkContext} = useContext(AuthContext);
  useEffect(()=> {
    // AccessibilityInfo.isScreenReaderEnabled().then( (screenReaderEnabled) => {
    //   if(screenReaderEnabled == true)
    //      talkContext(false);
    // });

  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
       <Text style={styles.title}>Fichas de inscrições semestrais</Text>
      </View>
      <CardSubscription/>
    </View>
  );
}

export default Subscription;