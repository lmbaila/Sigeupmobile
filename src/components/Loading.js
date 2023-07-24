import React, {useContext} from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import {colors} from '../styles';
import AuthContext from '../contexts/auth';
import {speckNormal} from '../helpers';

export default function Loading() {
  const {talk} = useContext(AuthContext);
  speckNormal('processando', talk);
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
})
