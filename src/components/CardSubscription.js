import React, { useEffect, useState, useContext} from 'react';
import { View, FlatList, Text, StyleSheet, TouchableWithoutFeedback, ActivityIndicator} from 'react-native';
import { semester } from '../services/semester';
import { colors } from '../styles/index';
import AuthContext from '../contexts/auth';
import {speckNormal} from '../helpers';

const CardSubscription = () => {
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState([]);
  const {talk, signOut} = useContext(AuthContext); 

  useEffect(()=> {
    
    getAllSubscription();

  }, []);
  async function getAllSubscription() {
    speckNormal('processando', talk);
    try{
      const response = await semester();
      setSubscription(response.data.data);
    }catch(error){
      if(error.response.status == 401) { //token invalido - nao autorizacao
        await signOut();
      } 
    }
    setLoading(false);
  }
  return (
    <>
   {loading? <ActivityIndicator size="large" color={colors.primary} />
    :<FlatList 
    data= {subscription}
    keyExtractor= {(item) => (item._id)}
    renderItem = {({item}) =>(
    <TouchableWithoutFeedback 
    
    onLongPress={()=> {speckNormal(`${item.semester}o semestre de ${item.period},
                                  Referência ${item.payment_reference},
                                  entidade ${item.payment_entity},
                                  quantia ${item.ammount} meticais,
    
    `, talk)}}
    accessible={true}
    accessibilityHint= {`inscrição do ${item.semester}o semestre de ${item.period} ${item.confirmed? "Confirmada" :"Nao confirmada"}`}
    onFocus={()=> {
      speckNormal(`inscrição do ${item.semester}o semestre de ${item.period} ${item.confirmed? "Confirmada" :"Nao confirmada"}`, talk)}}>
    <View style = {styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.titleCard}>{`${item.semester}o semestre de ${item.period}`}</Text>
        <Text style={styles.level}>{`${item.grade} nível`}</Text>
      </View>
      <View style={styles.item}
      accessible={true}
      accessibilityHint= {`Referência de ${item.payment_reference}`} 
      >
        <Text style={styles.labelItem}>Referência</Text>
        <Text style={styles.discriptionItem}>{`${item.payment_reference}`}</Text>
      </View>
      <View style={styles.item}
        accessible={true}
        accessibilityHint= {`Entidade ${item.payment_entity}`}  
      >
        <Text style={styles.labelItem}>Entidade</Text>
        <Text style={styles.discriptionItem}>{`${item.payment_entity}`}</Text>
      </View>
      <View style={styles.item}
        accessible={true}
        accessibilityHint= {`Quantia ${item.ammount} Meticais`}     
      >
        <Text style={styles.labelItem}>Quantia</Text>
        <Text style={styles.discriptionItem}>{item.ammount}</Text>
      </View>
      <View style={styles.item}
          accessible={true}
          accessibilityHint= {`inscrição ${item.confirmed? "confirmada": "Não confirmada"}`}  
      >
        <Text style={styles.labelItem}>Confirmação</Text>
        <Text style={[styles.confirmItem, {backgroundColor : item.confirmed? colors.green : colors.error}]}>{item.confirmed? "Sim": "Não"}</Text>
      </View>
    </View>
    </TouchableWithoutFeedback>
    )}
    />
    }

    </>
  );
}

const styles = StyleSheet.create({
  container :  {
    margin: 15,
    borderColor: colors.light,
    borderWidth: 1,
    backgroundColor: colors.white,
    borderRadius: 8,
   // padding: 5,
  },
  headerCard: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   backgroundColor: colors.primary,
   alignItems: 'center',
   position: 'relative',
   borderWidth: 1,
   borderColor: colors.primary,
   borderTopLeftRadius: 8,
   borderTopRightRadius: 8,
   padding: 5,
   top: -2,
  //  left:  -1,
  },
  titleCard: {
    color: colors.white,
    fontSize: 13,
    fontWeight: 'bold'
  },
  level: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '300'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 8,
  },
  labelItem: {
    color: colors.light,
    fontSize: 14,
    fontWeight: '200'
  },
  discriptionItem: {
    color: colors.dark,
    fontSize: 14,
    fontWeight: 'bold',
  },
  confirmItem: {
    backgroundColor: colors.error,
    paddingVertical: 3,
    paddingHorizontal: 4,
    borderRadius: 10,
    color: colors.white

  }

});

export default CardSubscription;