import React, { useContext, useEffect} from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, AccessibilityInfo } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import styles from './styles';
import AuthContext from '../../contexts/auth'; 
import {speak} from '../../helpers';
const Setting = () => {
  const {talk, talkContext} = useContext(AuthContext);
  useEffect(() => {
    AccessibilityInfo.isScreenReaderEnabled().then( (screenReaderEnabled) => {
      if(screenReaderEnabled == true)
         talkContext(false);
  });
  }, [])
  
  return (
    
    <SafeAreaView style={styles.container}>
      <ScrollView >
        <Text style={styles.settingTitle}>Acessibilidade</Text>
        <TouchableOpacity style ={styles.cardSetting} onPress = {() => { talkContext(!talk); if(!talk == true){
                speak('Narrador de tela ativado', true);
              }else{
                speak('Narrador de tela desativado', true);
              }}} 
        activeOpacity={0.1}
        touchSoundDisabled={false}>
        <>
          <View style ={styles.settingHeader}>
            <Text style ={styles.settingTitleLabel}>Narrador de Tela</Text> 
            <ToggleSwitch
              style = {styles.toggleSwitch}
              isOn={talk}
              onColor="#5C4DB1"
              offColor="#C0C0C0"
              size="small"
              onToggle={(isOn)=> {talkContext(isOn);  if(isOn == true){
                speak('Narrador de tela ativado', true);
              }else{
                speak('Narrador de tela desativado', true);
              }}}
            />
          </View>
          <Text style={styles.textDiscription}>Um recurso de acessibilidade que ajuda pessoas com deficiência  visual a selecionarem as opções presentes em menus do smartphone. O suporte de voz, para quem tem baixa ou perda total de visão</Text>
       </>
        </TouchableOpacity>
      </ScrollView>

    </SafeAreaView>
  );
}

export default Setting;