import React from 'react';
import { StyleSheet } from 'react-native';

const styles  = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'row',
    borderRadius: 15,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight:'bold',
    marginLeft: 3
  },
  scroll: {
    marginHorizontal: 15,
    paddingTop: 100,
   backgroundColor: '#fff',
   borderRadius: 10,
  
  }
});
export default styles;