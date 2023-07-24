import {colors} from '../styles';
import * as Speech from 'expo-speech';
export function styleFrequencyResult(frequency_result) {
  const initialChar = frequency_result[0];
  const style = {
    backgroundColor : (initialChar == "D") ? colors.green :
     (initialChar == "A") ? colors.yellow :
     (initialChar == "E") ? colors.error : colors.primary
  }
  return style;
} 
 


 export function speak(text, speech){
   if(speech){
    Speech.stop();
    Speech.speak(text, {language:'pt'});
   }
 }

 export function speckNormal(text, speech){
   if(speech){
    Speech.stop();
    Speech.speak(text, {language:'pt'});
   }
 }