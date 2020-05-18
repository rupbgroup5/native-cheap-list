import React, { useState, useEffect } from 'react'
import { Button, TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Input } from 'react-native-elements'
import RedirectApp2Web from '../GlobalFunctions/RedirectApp2Web'
import DialogInput from 'react-native-dialog-input'
import getUserContacts from "../GlobalFunctions/getUserContacts"


//social media:
import FaceBookLoginBtn from '../SocialNetwork/FacebookLogin'
import GoogleLoginBtn from '../SocialNetwork/GoogleLogin'


//push notdfications:
import handleExpoRegisteration from '../PushNotifications/handleExpoRegisteration'

export default function App({ navigation }) {
  let userName = "";
  let password = "";

  const [secureTextEntryToggle, set_secureTextEntryToggle] = useState(true);
  const [eye, set_eye] = useState('eye-slash');
  const [isDialogVisible_Iforgot, set_isDialogVisible_Iforgot] = useState(false);

  //onChange:
  let userNameTxt = (name) => { userName = name; }

  let userPassTxt = (p) => { password = p; }

  let change_secureTextEntry = () => {
    set_secureTextEntryToggle(!secureTextEntryToggle);
    secureTextEntryToggle ? set_eye('eye') : set_eye('eye-slash');

  }


  let LogIn = async () => {
    let contacts = await getUserContacts();

    await fetch(`http://proj.ruppin.ac.il/bgroup5/FinalProject/backEnd/api/AppUsers/AuthenticateUserLogin/${userName}/${password}`)
    .then((response) => response.json())
    .then((userDetails) => {
      if (userDetails === null) {
        alert('שם משתמש/סיסמא שגויים');
      } else {
       userDetails.Contacts = contacts;
      // console.log(userDetails);
        handleExpoRegisteration(userDetails.UserID);
        RedirectApp2Web(userDetails.UserID);

       // UPDATE THE USER'S CONTACTS LIST:
        fetch("http://proj.ruppin.ac.il/bgroup5/FinalProject/backEnd/api/AppUsers/updateUserContacts", {
          method: 'POST',
          headers: new Headers({
            'Content-type': 'application/json; charset=UTF-8'
          }),
          body: JSON.stringify(userDetails)
        }).then(res => { return res.json(); })
        .then(
          (result) => {
            console.log(result);
          })
          .catch((error) => {
            console.log("updateUserContacts error: ! -> ",error);
          });

        }
      })
      .catch((error) => {
        console.log("AuthenticateUserLogin : ! ->",error);
      });
      //crate a function that recive userID and check if user have updated expo token or if need to update make an register ... {userDetails.UserID}


  }

  let checkEmail = (mail) => {
    return mail.includes('@') && mail.includes('.') && mail.includes('com') || mail.includes('co.il') || mail.includes('net');
  }


  let GoToRegister = () => { navigation.navigate('דף הרשמה'); }

  let forgot = () => { set_isDialogVisible_Iforgot(true); }

  let getDetaildAndSendMail = async (mail) => {
    //need to handle what happens when user insert mail which doesn't exist... ! (c#)
    if (checkEmail(mail)) {
      let mailWithNoDots = mail.replace(".", "_");
      let goFetchPass = `http://proj.ruppin.ac.il/bgroup5/FinalProject/backEnd/api/AppUsers/SendUserPassword/${mailWithNoDots}`

      fetch(goFetchPass)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        alert(res); //handeled in the backend orelkarmi10@gmail.com
        set_isDialogVisible_Iforgot(false);
      })
      .catch((error) => {
        console.error(error);
        alert('ככל הנראה קרתה שגיאה במערכת או שהמייל שסופק אינו קיים אצלנו במערכת');
      });
    } else {
      alert('יש להקליד מייל חוקי');
    }
  }


  return (
    <View style={styles.container}>
      <DialogInput
        isDialogVisible={isDialogVisible_Iforgot}
        title={"אויש שחכתי"}
        message={"אנא הכניסו את המייל שמזוהה עם המשתמש/ת שלכם"}
        submitInput={(mail) => { getDetaildAndSendMail(mail) }}
        closeDialog={() => { set_isDialogVisible_Iforgot(false); }}>
      </DialogInput>
      <View></View>
      <View>
        <Input placeholder='שם משתמש' rightIcon={<Icon name='user' size={24} />}
          onChangeText={userNameTxt} // by default sends the value...
        />
        <Input placeholder='סיסמא' secureTextEntry={secureTextEntryToggle} rightIcon={<TouchableOpacity
          onPress={change_secureTextEntry}>
          <Icon name={eye} size={24} />
        </TouchableOpacity>
        }
          onChangeText={userPassTxt} // by default sends the value... like in react.js e.target.value
        />
        <Button title="הכנס" onPress={LogIn} />
        <View>
          <Text style={styles.txt}>
            שחכתם סיסמא או את שם המשתמש/ת? לחץ כאן ↓
          </Text>
        </View>
        <Button title='אויש שכחתי' onPress={forgot} />
      </View>
      <View>
        <FaceBookLoginBtn />
        <GoogleLoginBtn />
      </View>
      <View>

        <Button title="יצירת משתמש חדש" onPress={GoToRegister} />
      </View>
    </View>);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  txt: {
    textAlign: 'center'
  }
});