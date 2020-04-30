import React, { useState } from 'react';
import { Button, TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
//import insert from '../DBfunctions/Insert'
import RedirectApp2Web from '../GlobalFunctions/RedirectApp2Web'
import getUserContacts from '../GlobalFunctions/getUserContacts';



let FCRegister = () => {
  let userName = "";
  let userPassword = "";
  let userRePassword = "";
  let userEmail = "";

  const [secureTextEntryToggle, set_secureTextEntryToggle] = useState(true);
  const [eye, set_eye] = useState('eye-slash');

  let change_secureTextEntry = () => {
    set_secureTextEntryToggle(!secureTextEntryToggle);
    secureTextEntryToggle ? set_eye('eye') : set_eye('eye-slash');
  }

  let checkEmail = (mail) => {
    return mail.includes('@') && mail.includes('.') && mail.includes('com') || mail.includes('co.il') || mail.includes('net');
  }

  let checkPasswordMatch = () => { return !(userPassword === userRePassword); }

  let RegisterAndThenLogin = async () => {

    if (userName === "") {
      return alert('חייב להכניס שם משתמש/ת');
    }
    if (!checkEmail(userEmail) || userEmail === "") {
      return alert('אנא הכניסו מייל חוקי');
    }
    if (checkPasswordMatch()) {
      return alert('נראה שהסיסמאות אינן תואמות');
    }
    let contacts = await getUserContacts();
    let newUser = {
      UserName: userName,
      UserPassword: userPassword,
      UserMail: userEmail,
      Contacts: contacts,
    }

   // post new user and then go2web with its ID 
    fetch("http://proj.ruppin.ac.il/bgroup5/FinalProject/backEnd/api/AppUsers/PostUser", {
      method: 'POST',
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8'
      }),
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((newUserID) => {
        console.log(newUserID);
        RedirectApp2Web(newUserID); 
      })
      .catch((error) => {
        console.log('some error catched ', error);
      });

  }

  let userNameChange = (name) => { userName = name; }

  let emailChange = (mail) => { userEmail = mail; }

  let passwordChange = (password) => { userPassword = password; }

  let rePasswordChange = (rePassword) => { userRePassword = rePassword; }


  return (
    <View style={styles.container}>

      <Input placeholder='בחר שם משתמש'
        rightIcon={
          <Icon name='user'
            size={24}
          />}
        onChangeText={userNameChange}
      />
      <Input placeholder='הכנס אי מייל'
        rightIcon={
          <Icon name='at'
            size={24}
          />}
        onChangeText={emailChange}

      />
      <Input placeholder='הכנס סיסמא'
        secureTextEntry={secureTextEntryToggle}
        rightIcon={
          <TouchableOpacity
            onPress={change_secureTextEntry}>
            <Icon name={eye} size={24} />
          </TouchableOpacity>
        }
        onChangeText={passwordChange}

      />
      <Input placeholder='הכנס אימות סיסמא'
        secureTextEntry={secureTextEntryToggle}
        rightIcon={
          <TouchableOpacity
            onPress={change_secureTextEntry}>
            <Icon name={eye} size={24} />
          </TouchableOpacity>
        }
        onChangeText={rePasswordChange}

      />
      <Button title="הרשם והכנס" onPress={RegisterAndThenLogin} />
    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FCRegister;