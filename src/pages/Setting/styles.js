
import { StyleSheet } from 'react-native';
import { colors } from '../../styles';
const styles = StyleSheet.create({
  container:{
    paddingTop: 45,
    backgroundColor: '#fff',
    flex:1
  },
  settingTitle: {
    fontSize: 20,
    color: colors.darker,
    fontWeight: 'bold',
    margin: 15,
  },
  cardSetting: {
    backgroundColor: colors.lighter,
    padding: 7,
  },
  settingHeader:{
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingHorizontal: 7,  
  },
  settingTitleLabel: {
    color: colors.light,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textDiscription: {
    fontSize: 15,
    color: '#707070',
    marginTop: 5,
    marginHorizontal: 5,
    //textAlign:"justify"
  }

});
export default styles;