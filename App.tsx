import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FinanceProvider } from './src/context/FinanceContext';
import HomeScreen from './src/screens/HomeScreen';
import AdicionarGanho from './src/screens/AdicionarGanho';
import AdicionarGasto from './src/screens/AdicionarGasto';

const Stack = createStackNavigator();

export default function App() {
  return (
    <FinanceProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AdicionarGanho" component={AdicionarGanho} />
          <Stack.Screen name="AdicionarGasto" component={AdicionarGasto} />
        </Stack.Navigator>
      </NavigationContainer>
    </FinanceProvider>
  );
}
