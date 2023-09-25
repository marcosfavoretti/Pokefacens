import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { Pokedex } from './telas/Pokedex';

export default function App() {
  const Stack = createNativeStackNavigator()
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName='Pokedex'>
              <Stack.Screen name='Pokedex' component={Pokedex}></Stack.Screen>
          </Stack.Navigator>
      </NavigationContainer>
  )
}

