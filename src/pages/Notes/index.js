import React, {useEffect, useState, useContext} from 'react';
import { View, AccessibilityInfo } from 'react-native';
import AuthContext from '../../contexts/auth';
import CardNotes from '../../components/CardNotes';
import NotFound404 from '../../components/NotFound404';
import Loading from '../../components/Loading';
import styles from './styles';
import {semesterNotes} from '../../services/semester'; 
import {speckNormal} from '../../helpers';
//import { navigationRef, isMountedRef }  from '../../routes/RootNavigation';
function Notes ({route}) {
  const [semesterInfo] =  useState(route.params);
  const [notes, setNotes] = useState([]);

  const [loading, setloading] = useState(true);
  const [notFoundData, setNotFoundData] = useState(false);
  const {talk, talkContext} = useContext(AuthContext);
  useEffect(()=> {
    AccessibilityInfo.isScreenReaderEnabled().then( (screenReaderEnabled) => {
      if(screenReaderEnabled == true)
         talkContext(false);
    });
    getSubjectNotesOfSemester();
  }, []); 
  async function getSubjectNotesOfSemester(){   
    try{
      const response  = await semesterNotes(semesterInfo._id);
      setNotes(response.data);
      
      if(response.data[0] == null) {
        speckNormal('Não há notas encontradas para o semestre selecionado, Verifica se a inscrição para o semestre selecionado foi confirmada, para caso de ser estudante do pós-laboral verifica também se já foram confirmados os pagamentos das propinas. Efetue a avaliação do corpo docente caso esteja disponível na plataforma.', talk);
        setNotFoundData(true);
      }
        
      

      setloading(false);
     }catch(err){
      setloading(false);
     }
  }
  return (
    <>
    {
     notFoundData ?
      <NotFound404 title = {"Não há notas encontradas para o semestre selecionado"} info = {"Verifica se a inscrição para o semestre selecionado foi confirmada, para caso de ser estudante do pós-laboral verifica também se já foram confirmados o pagamento de propinas. Efectue a avaliação do corpo docente caso  esteja disponível na plataforma."}/> 
      
      :
      <View  style={styles.container}>
      {loading ? <Loading /> : <CardNotes notes = {notes} />}    
      </View>
    }

    </>
  ); 
}

export default Notes;