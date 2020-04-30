import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


//our screens:
import FCLogIn from './Components/FCLogIn';
import FCRegister from './Components/FCRegister';
const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="דף כניסה" component={FCLogIn}
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
        <Stack.Screen name="דף הרשמה" component={FCRegister}
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
