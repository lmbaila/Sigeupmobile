import * as Speech from 'expo-speech';

export function speak(text, speech) {
  if (speech) {
    Speech.stop();
    Speech.speak(text, { language: 'pt' });
  }
}

export const speckNormal = speak;
