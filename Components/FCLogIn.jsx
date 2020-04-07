import React, { useState } from 'react';
import {
  Button,
  TouchableOpacity,
  StyleSheet,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { SocialIcon } from 'react-native-elements';

import * as WebBrowser from 'expo-web-browser';

//import { PermissionsAndroid } from 'react-native'; //need to check if apple needs permission as well
//import Contacts from 'react-native-contacts';


export default function App({ navigation }) {
  let userName = "";
  let password = "";
  let apiUrl = 'http://proj.ruppin.ac.il/bgroup5/FinalProject/backEnd/api/AppUsers/PostUser/{newUser}';

  const [secureTextEntryToggle, set_secureTextEntryToggle] = useState(true);
  const [eye, set_eye] = useState('eye-slash');

  // useEffect(() => {
  //   PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  //     {
  //       'title': 'Contacts',
  //       'message': 'This app would like to view your contacts.',
  //       'buttonPositive': 'Please accept bare mortal'
  //     }
  //   ).then(() => {
  //     Contacts.getAll((err, contacts) => {
  //       if (err === 'denied' || err ){
  //        console.log("huston we have a problem ==> "+err);
         
  //       } else {
  //         console.log('great success !');
  //         console.log(contacts[0]);
  //       }
  //     })
  //   })
  // }, []);
  
  let userNameTxt = (name) => {
    userName = name;
  }

  let userPassTxt = (p) => {
    password = p;
  }

  let change_secureTextEntry = () => {
    set_secureTextEntryToggle(!secureTextEntryToggle);
    secureTextEntryToggle ? set_eye('eye') : set_eye('eye-slash');
  }

  let LogIn = () => {
    let userAuthentication = {
      UserName: userName,
      UserPassword: password,
      UserMail: 'temp@expermental@gmail.com',
      UserAdress: 'Experemntal City',

    }
    //post expermental data to our db (future to be contacts list with proper key)
    insert2DB(userAuthentication);
    //move to our web app: + need to send key !!!!!
    WebBrowser.openBrowserAsync('http://proj.ruppin.ac.il/bgroup5/FinalProject/frontEnd');


    // goFetchData(userAuthentication);
  }

  let insert2DB = (userDetails) => {
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8' ,
      },
      body: JSON.stringify(userDetails),
    })
    .then((response) => response.json())
    .then((json) => {
     console.log(json);
    })
    .catch((error) => {
      console.error('some error catched ',error);
    });

  }

  let GoToRegister = () => {
    navigation.navigate('Cheap List Register');
  }

  let googleReg = () => {
    alert('google register')
  }

  let facebookReg = () => {
    alert('facebook register')

  }

  return (
    <View style={styles.container}>
      <View></View>
      <View>
        <Input placeholder='שם משתמש'
          rightIcon={
            <Icon name='user'
              size={24}
            />}
          onChangeText={userNameTxt} // by default sends the value...
        />
        <Input placeholder='סיסמא'
          secureTextEntry={secureTextEntryToggle}
          rightIcon={
            <TouchableOpacity
              onPress={change_secureTextEntry}>
              <Icon name={eye} size={24} />
            </TouchableOpacity>
          }
          onChangeText={userPassTxt} // by default sends the value... like in react.js e.target.value
        />
        <Button title="הכנס" onPress={LogIn} />
      </View>
      <View>
        <SocialIcon
          title='הרשם באמצעות פייסבוק'
          button
          type='facebook'
          onPress={facebookReg}
        />
        <SocialIcon
          title='הרשם באמצעות גוגל'
          button
          type='google'
          onPress={googleReg}
        />
      </View>
      <View>
        <Button title="עדיין אין לך משתמש?" onPress={GoToRegister} />
      </View>
    </View>);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },

});
