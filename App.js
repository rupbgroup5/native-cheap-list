import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


//my screens:
import FCLogIn from './Components/FCLogIn';
import FCRegister from './Components/FCRegister';
const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Cheap List Log In" component={FCLogIn}
          options={{
            headerStyle: {
              backgroundColor: '#3498eb',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontSize: 40
            },
            headerTitleAlign: 'center',

          }}
        />
        <Stack.Screen name="Cheap List Register" component={FCRegister}
          options={{
            headerStyle: {
              backgroundColor: '#3498eb',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontSize: 40
            },
            headerTitleAlign: 'center',

          }}
        />
      </Stack.Navigator>

    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
