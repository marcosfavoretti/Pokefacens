import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pokedex } from './telas/Pokedex';
import { InfoPokemon } from './telas/info-pokemon/InfoPokemon';

export default function App() {
  const Stack = createNativeStackNavigator()
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName='Pokedex'>
              <Stack.Screen name='Pokedex' options={{headerShown:false}}  component={Pokedex}></Stack.Screen>
              <Stack.Screen name='InfoPokemon' options={{headerShown:false}} component={InfoPokemon}></Stack.Screen>
          </Stack.Navigator>
      </NavigationContainer>
  )
}

