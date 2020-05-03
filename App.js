import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
//import Register4PN_AndGetToken_Async from "./PushNotifications/Register4PN_AndGetToken_Async"
import { Notifications } from 'expo'

//our screens:
import FCLogIn from './Components/FCLogIn';
import FCRegister from './Components/FCRegister';
const Stack = createStackNavigator();


export default function App() {
  let notificationOnDevice = null;
  let token = null;

  useEffect(() => {

    (async () => {
      //token = await Register4PN_AndGetToken_Async(); //temporary the token is allready saved in the database...
      //console.log(token); //take the token from the console in the mid time and post it to the data base, handeling it throw our backend will be later
      Notifications.addListener(HandleNotification);
    })();

  }, []);

  const HandleNotification = (notificationFromCloud) => {
    notificationOnDevice = notificationFromCloud;
  }
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
