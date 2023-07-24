import React, {useEffect,  useContext} from 'react';
import { View, Text, Dimensions, StyleSheet, FlatList, TouchableWithoutFeedback} from 'react-native';
import {colors} from '../../src/styles';
const {width} = Dimensions.get('window');
import {styleFrequencyResult, speak, speckNormal} from '../helpers';
import AuthContext from '../contexts/auth';

const CardNotes = ({notes}) => {
  const {exameNote, exameView, talk} = useContext(AuthContext); 
  useEffect(()=> {
    exameView(false); // default is false
  }, []);
  return (
    <FlatList 
       data= {notes}
       keyExtractor= {(item) => (item._id)}
       renderItem ={ ({item}) => (
        <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {speckNormal(`${item.discipline.name}`, talk)}}
          accessible={true}
          accessibilityHint= {`${item.discipline.name}`}
        >
        <Text style={styles.labeSubject}>{(item.discipline.name.length >= 28) ? `${item.discipline.name.substr(0, 28)}...` :item.discipline.name}</Text>
        </TouchableWithoutFeedback>
       {!exameNote ?  
       <>
       <Text style={styles.labelTypeNotes}>Testes</Text>
        <View style={styles.typeNotes}>
          <TouchableWithoutFeedback
            onPress={()=> {(item.test1 != null)? speak(`Primeiro teste ${item.test1} valores`, talk) :
            speak(`sem nota do primeiro teste`, talk)}}  
            accessible={true}
            accessibilityHint= {(item.test1 != null)? `Primeiro teste ${item.test1} valores`: `sem nota do primeiro teste`}       
          >
          <View style={styles.note}>
            <Text style={styles.noteText}>{item.test1}</Text>
          </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback 
          onPress={()=> {(item.test2 != null)? speak(`segundo teste ${item.test2} valores`, talk) :
                           speak(`sem nota do segundo teste`, talk)  }}
                           accessible={true}
                           accessibilityHint= {(item.test2 != null)? `segundo teste ${item.test2} valores`: `sem nota do segundo teste`} 
                           
          >
                        
            <View style={styles.note}>
              <Text style={styles.noteText}>{item.test2}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback 
            onPress={()=> {(item.test3 != null)? speak(`terceiro teste ${item.test3} valores`, talk) :
                           speak(`sem nota do terceiro teste`, talk)  }}
                           accessible={true}
                           accessibilityHint= {(item.test2 != null)? `terceiro teste ${item.test2} valores`: `sem nota do terceiro teste`}               
            >
          <View style={styles.note}>
            <Text style={styles.noteText}>{item.test3}</Text>
          </View>
          </TouchableWithoutFeedback>
        </View>
        <Text style={styles.labelTypeNotes}>Trabalhos</Text>
        <View style={styles.typeNotes}>
          <TouchableWithoutFeedback
          // touchSoundDisabled={true}
          onPress={()=> {(item.work1 != null)? speak(`Primeiro trabalho ${item.work1} valores`, talk) :
                           speak(`sem nota do primeiro trabalho`, talk)  }}
                           accessible={true}
                           accessibilityHint= {(item.test2 != null)? `Primeiro trabalho ${item.work1} valores`: `sem nota do Primeiro trabalho`}          
          >
          <View  style={styles.note}>
             <Text style={styles.noteText}>{item.work1}</Text>
          </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback  
            touchSoundDisabled={true}
             onPress={()=> {(item.work2 != null)? speak(`segundo trabalho ${item.work2} valores`, talk) :
             speak(`sem nota do segundo trabalho`, talk)}}
             accessible={true}
             accessibilityHint= {(item.work2 != null)? `segundo trabalho ${item.work2} valores`: `sem nota do segundo trabalho`} 
             >
          <View style={styles.note}>
            <Text style={styles.noteText}>{item.work2}</Text>
          </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback touchSoundDisabled={true}
             onPress={()=> {(item.work3 != null)? speak(`terceiro trabalho ${item.work3} valores`, talk) :
             speak(`sem nota do terceiro trabalho`, talk)}}
             accessible={true}
             accessibilityHint= {(item.work3 != null)? `terceiro trabalho ${item.work3} valores`: `sem nota do terceiro trabalho`} 
             >
          <View style={styles.note} >
            <Text style={styles.noteText}>{item.work3}</Text>
          </View>
          </TouchableWithoutFeedback>

        </View>
        <TouchableWithoutFeedback 
        onPress = {() => {speckNormal(`${item.frequency_result} na cadeira de ${item.discipline.name} com a média de ${item.frequency_avg} Valores`, talk)}}
        accessible={true}
        accessibilityHint= {`${item.frequency_result} na cadeira de ${item.discipline.name} com a média de ${item.frequency_avg} Valores`}     
         >
          <View style={styles.average}>
            <Text style={styles.averagelabel}>Media</Text>
            <View style={[styles.avaregeInfoContent, styleFrequencyResult(item.frequency_result)]}>
              <Text style={styles.averageText}>{item.frequency_avg}</Text>
              <Text style={styles.averageState}>{item.frequency_result}</Text>
            </View>  
          </View>
        </TouchableWithoutFeedback>
        </>
        : <> 
        <TouchableWithoutFeedback onPress = {() => {speckNormal(`${item.frequency_result} com a média de frequência de  ${item.frequency_avg} valores`, talk)}}
           accessible={true}
           accessibilityHint= {`${item.frequency_result} com a média de frequência de  ${item.frequency_avg} valores`}
        >
          <View style={{flexDirection: 'row',}}>
           <Text style={[styles.avarageExameStatus, styleFrequencyResult(item.frequency_result)]}>{item.frequency_result}</Text>
           <Text style = {[styles.avarageExameNote]}>{item.frequency_avg}</Text>
          </View>
        </TouchableWithoutFeedback>

          <View style={styles.exameInfo}>
            <TouchableWithoutFeedback 
                       accessible={true}
                       accessibilityHint= {!!item.exam? `Exame normal ${item.exam} valores` : 'Sem nota do exame normal'}
            onPress = {() => {!!item.exam? speckNormal(`Exame normal ${item.exam} valores`, talk): speckNormal(`Sem nota do exame normal`, talk)}}>
              <View style={styles.exameInfoContent}>
                <Text style={{fontWeight: 'bold', color : colors.regular, fontSize: 14}}>E. Normal</Text>
                <Text style={styles.exameInfoFinalNote}>{!!item.exam? item.exam : "      "}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback 
                       accessible={true}
                       accessibilityHint= {!!item.exam_recurrence? `Exame de recorrência ${item.exam_recurrence} valores` : 'Sem nota do exame de recorrência'}
            onPress = {()=>{!!item.exam_recurrence? speckNormal(`Exame de recorrência ${item.exam_recurrence} valores`, talk): speckNormal(`Sem nota do exame de recorrência`, talk)}}>
            <View style={styles.exameInfoContent}>
              <Text style={{fontWeight: 'bold', color : colors.regular, fontSize: 14}}>E. Recorrência</Text>
              <Text style={styles.exameInfoFinalNote}>{!!item.exam_recurrence ? item.exam_recurrence : "      "}</Text>
            </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback 
            
            onPress ={() => {!!item.final_avg? speckNormal(`${item.final_result} com a média final de ${item.final_avg} valores`, talk) : 
              speckNormal(`${item.final_result}`, talk)
            }}
            accessible={true}
            accessibilityHint= {!!item.final_avg? `${item.final_result} com a média final de ${item.final_avg} valores` : `${item.final_result}`} 
            >
            <View style={styles.exameInfoContent}>
              <Text style={{fontWeight: 'bold', color : colors.regular, fontSize: 14}}>R. Final</Text>
              <View style={{flexDirection: 'row',}}>
                 <Text style={[styles.avarageExameStatus,]}>{item.final_result}</Text>
                 <Text style = {[styles.avarageExameNote]}>{item.final_avg}</Text>
              </View>
            </View>
           </TouchableWithoutFeedback>
          </View>
        </>
    }
      </View>    
      )}
      /> 
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 15,
    borderColor: colors.light,
    borderWidth: 1,
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingTop: 20,
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  labeSubject: {
    top: -12,
    position: 'absolute',
    left: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.primary,
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
    borderRadius: 4,
  },
  labelTypeNotes: {
    fontSize: 14,
    color: '#6A696D',
  },
  typeNotes: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  note:{
    height: (width/3) - 70,
    width: (width/3) - 30,
    backgroundColor: colors.primary,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  noteText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold'
  },
  average: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  //  paddingLeft: 15,
    marginRight: 10,
  }, 
  averagelabel: {
    fontSize: 14,
    color: '#6A696D',
  },
  averageText: {
    fontSize: 16,
    color: '#6A696D',
  },
  avaregeInfoContent: {
    backgroundColor: colors.yellow,
    flexDirection: 'row',
    borderRadius: 6,
    justifyContent: 'space-between',
   //s paddingHorizontal: 4
   paddingRight:5,
  },
  averageText: {
    position: 'relative',
    left: -2,
    backgroundColor: colors.primary,
    paddingHorizontal: 4,
   // borderRadius: 6,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    marginRight: 4,
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'

  },
  averageState: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  },
  avarageExameStatus: {
    backgroundColor: colors.primary,
    paddingVertical: 2,
    paddingLeft: 4,
    paddingRight: 10,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    color: colors.white,
    fontWeight: 'bold'
  },
  avarageExameNote: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4, 
    backgroundColor: colors.primary,
    paddingVertical:2,
    paddingHorizontal: 4,
    color: colors.white,
    fontWeight: 'bold'
  },
  exameInfo: {
    marginVertical: 2, 
    paddingVertical: 3,
  },
  exameInfoContent: {
     marginVertical: 4,
     flexDirection: 'row', 
     justifyContent: 'space-between'
  },
  exameInfoFinalNote: {
      borderRadius: 4,
      backgroundColor: colors.primary,
      fontWeight:'bold',
      color: colors.white,
      fontSize: 14,
      paddingHorizontal: 4,
      paddingVertical: 2,
  }
})

export default CardNotes;