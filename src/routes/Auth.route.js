import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { navigationRef } from './RootNavigation';
import { colors, TabBar } from '../design-system';

import Home from '../pages/Home';
import Notas from '../pages/Notas';
import NotasDetalhe from '../pages/NotasDetalhe';
import Financeiro from '../pages/Financeiro';
import FacturaDetalhe from '../pages/FacturaDetalhe';
import Mais from '../pages/Mais';
import Documentos from '../pages/Documentos';
import PlanoCurricular from '../pages/PlanoCurricular';
import Perfil from '../pages/Perfil';
import Definicoes from '../pages/Definicoes';
import NavigatingOut from '../pages/NavigatingOut';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="Início" component={Home} />
      <Tab.Screen name="Notas" component={Notas} />
      <Tab.Screen name="Financeiro" component={Financeiro} />
      <Tab.Screen name="Mais" component={Mais} />
    </Tab.Navigator>
  );
}

export default function MainRoutes() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.primaryDark,
          headerTitleStyle: { color: colors.textPrimary, fontWeight: '700' },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen
          name="NotasDetalhe"
          component={NotasDetalhe}
          options={({ route }) => ({
            title: route.params.all
              ? 'Todas as disciplinas'
              : `${route.params.semester}º Semestre de ${route.params.period}`,
          })}
        />
        <Stack.Screen name="FacturaDetalhe" component={FacturaDetalhe} options={{ title: 'Detalhes da factura' }} />
        <Stack.Screen name="Documentos" component={Documentos} options={{ title: 'Documentos úteis' }} />
        <Stack.Screen name="PlanoCurricular" component={PlanoCurricular} options={{ title: 'Plano curricular' }} />
        <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
        <Stack.Screen name="Definicoes" component={Definicoes} options={{ title: 'Definições' }} />
        <Stack.Screen name="NavigatingOut" component={NavigatingOut} options={{ title: 'Plataforma' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
