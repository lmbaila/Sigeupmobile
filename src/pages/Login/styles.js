import react from 'react';
import {StyleSheet} from  'react-native';

import {metrics, colors, fonts} from '../../styles';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
       justifyContent: 'center',
   },
    txterrorMessage: {
        fontSize: 16,
        color: colors.error,
        marginBottom: 10,
    },
    form:{
        alignSelf: 'stretch',
        paddingHorizontal: 20,
    },
    input: {
        borderWidth: 0.5,
        borderColor: colors.regular,
        borderRadius: 9,
        height: 55,
        paddingHorizontal: 40,
        color: colors.regular,
        fontSize: fonts.regular,
        fontWeight:"bold",
       // marginVertical: 20,
    },
    contentInput: {
        height: 40,
        marginBottom: 20,
    },
    icon: {
        position: 'absolute',
        zIndex: 3,
        bottom:-1,
        left:10,
    },
    botton: {
        marginTop: 10,
        height: 55,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: colors.primary,
        borderRadius: 9,
    },
    textBotton: {
        color: colors.white,
        fontWeight: 'bold'
    },
    logo: {
        width: 80,
        height: 80, 
        alignSelf: 'center',
        marginBottom: 50,
        resizeMode: 'cover',
        
    },
    errorMessage: {
        marginBottom: 10,
        color: colors.error,
        fontSize: 14,
    }
});
export default styles;