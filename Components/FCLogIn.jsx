import React, { useState, useEffect } from 'react';
import {
  Button,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { PermissionsAndroid } from 'react-native'; //need to check if apple needs permission as well
import Contacts from 'react-native-contacts';


export default function App({ navigation }) {
  let userName = "";
  let password = "";

  const [secureTextEntryToggle, set_secureTextEntryToggle] = useState(true);
  const [eye, set_eye] = useState('eye-slash');

  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Contacts',
        'message': 'This app would like to view your contacts.',
        'buttonPositive': 'Please accept bare mortal'
      }
    ).then(() => {
      Contacts.getAll((err, contacts) => {
        if (err === 'denied' || err ){
         console.log("huston we have a problem ==> "+err);
         
        } else {
          console.log('great success !');
          console.log(contacts[0]);
        }
      })
    })
  }, []);
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
      Password: password
    }
    alert(`שלום ${userAuthentication.UserName} `);

    // goFetchData(userAuthentication);

  }

      /**PAY ATTENTION !!! → When upload to rup server there is a need to manage data of users login (matches of password to name) */
  // let goFetchData = (userAuthentication) => {
  //   let fullRouteUrl = apiUrl + userAuthentication.UserName
  //   //console.log(fullRouteUrl);

  //   fetch(fullRouteUrl, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json; charset=UTF-8',
  //     }
  //   })
  //     .then(res => {
  //       console.log(res.json());
  //       return res.json()

  //     })
  //     .then(
  //       (result) => {
  //         console.log("here is what I got", result);
  //       },
  //       (error) => {
  //         console.log("im getting error in goFetchData() ",error);
  //       });

  // }




  let GoToRegister = () => {
    navigation.navigate('Cheap List Register');
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
