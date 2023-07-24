import React, {useContext} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { navigationRef } from '../routes/RootNavigation';

//Pages
import  Subscription from '../pages/Subscription';
import Home from '../pages/Home';
import FrequencyNotes from '../pages/FrequencyNotes';
import Notes from '../pages/Notes';
import Setting from '../pages/Setting';
import NavigatingOut from '../pages/NavigatingOut';


//Navigator
const Stack = createStackNavigator();
const TabNav = createBottomTabNavigator();

import AuthContext from '../contexts/auth';
import {speckNormal} from '../helpers';

function Tabs() { 
  const {talk} = useContext(AuthContext); 
  return (
    <TabNav.Navigator
      /*tabBarOptions = {
        {
           activeTintColor: '#5C4DB1',
           inactiveTintColor: '#707070',
           labelStyle: {
             fontSize: 14,
             marginBottom: 2
           }
        }
      },*/
      screenOptions={
          {
             headerStyle: {
               backgroundColor: '#5C4DB1',
               borderBottomColor: 'transparent',
              
            },
            headerTitleStyle: { color: '#fff' },
             tabBarLabelStyle: {
              fontSize: 14, 
              marginBottom: 2
            }, 
            tabBarInactiveTintColor: '#707070',
            tabBarActiveTintColor: '#5C4DB1'
           }
      }
    >
      
      <TabNav.Screen name="Home" component={Home} 
      
        options = {
          {
            tabBarIcon: ({ focused, color, size }) => {
             return(
                focused ? <MaterialIcons  name={'home'} color={color} size={24}/> : <MaterialIcons name={'home'} color={color} size={24}/> 
             );
            },
            
          }
        }
        listeners = {{
          tabPress: e => {
            speckNormal('tela inicial', talk);
            //e.preventDefault();
          }
        }}
      />
      <TabNav.Screen name="Notas" component={FrequencyNotes} 
        options = {
          {
            tabBarIcon: ({ focused, color, size }) => {
             return(
                focused ? <MaterialIcons  name={'assessment'} color={color} size={24}/> : <MaterialIcons name={'assessment'} color={color} size={24}/>
             );
            }
          }
        }
        listeners = {{
          tabPress: e => {
            speckNormal('Tela de Notas de frequencia', talk);
            //e.preventDefault();
          }
        }}
      />
      <TabNav.Screen name="Inscrições" component={Subscription} 
        options = {
          {
            tabBarIcon: ({ focused, color}) => {
             return(
                focused ? <MaterialIcons  name={'assignment-turned-in'} color={color} size={24}/> : <MaterialIcons name={'assignment-turned-in'} color={color} size={24}/>
             );
            }, 
          }
        }
        listeners = {{
          tabPress: e => {
            speckNormal('tela de Inscrições', talk);
            //e.preventDefault();
          }
        }}
      />
        <TabNav.Screen name="Definições" component={Setting} 
        options = {
          {
            tabBarIcon: ({ focused, color}) => {
             return(
                focused ? <MaterialIcons  name={'settings'} color={color} size={24}/> : <MaterialIcons name={'settings'} color={color} size={24}/>
             );
            }, 
          }
        }
        listeners = {{
          tabPress: e => {
            speckNormal('tela de Definições', talk);
            //e.preventDefault();
          }
        }}
      />

    </TabNav.Navigator>
  );
}

function App() {

  const {exameNote, exameView, talk} = useContext(AuthContext);
  return (
    <NavigationContainer  ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={Tabs}  options={{headerShown:false}}  />
        <Stack.Screen 
        name="Notes" 
        component={Notes}
        options={
          ({ route }) => ({
             title: `${route.params.semester}º Semestre de ${route.params.period}`,
             headerRight: () => (
            exameNote ? (<TouchableOpacity onPress={() => {exameView(false); speckNormal(`Notas do ${route.params.semester}º Semestre de ${route.params.period}`, talk); } } style ={{borderRadius: 6,backgroundColor: '#5C4DB1', padding: 4, marginRight: 15}}>
              <Text style={{color: '#fff',  fontWeight: 'bold'}}>Notas</Text>
            </TouchableOpacity>) :( <TouchableOpacity onPress={() => {exameView(true); speckNormal(`Exames do ${route.params.semester}º Semestre de ${route.params.period}`, talk);} } style ={{borderRadius: 6,backgroundColor: '#5C4DB1', padding: 4, marginRight: 15}}>
              <Text style={{color: '#fff',  fontWeight: 'bold'}}>Exames</Text>
            </TouchableOpacity>)
             ),
         })
          
        }      
        />
        <Stack.Screen name="Setting" component={Setting} options={{title: 'Definições'}}/>
        <Stack.Screen name="NavigatingOut" component={NavigatingOut} options={{title: 'Plataforma'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default  App;

