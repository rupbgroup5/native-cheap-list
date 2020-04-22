import React, { useState } from 'react'
import { Button, TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Input } from 'react-native-elements'
import RedirectApp2Web from '../GlobalFunctions/RedirectApp2Web'
import DialogInput from 'react-native-dialog-input';
import getUserContacts from '../GlobalFunctions/getUserContacts'


//social media:
import FaceBookLoginBtn from '../SocialNetwork/FacebookLogin'
import GoogleLoginBtn from '../SocialNetwork/GoogleLogin'

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


  let LogIn = () => {
    let usersData = {
      UserName: userName,
      UserPassword: password
    }
    fetch(`http://proj.ruppin.ac.il/bgroup5/FinalProject/backEnd/api/AppUsers/AuthenticateUserLogin/${usersData.UserName}/${usersData.UserPassword}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        response.json();
      })
      .then((json) => {
        usersData = json;
      })
      .catch((error) => {
        console.error('some error catched ', error);
      });


    if (usersData === undefined) {
      alert('ככל הנראה ההתאמה בין שם המשתמש והסיסמא שגויה');
    } else {
     // RedirectApp2Web(usersData.UserName); // for future fix, maybe it should be sending name and password or make name uniqe in the database
    }
  }

  let checkEmail = (mail) => {
    return mail.includes('@') && mail.includes('.') && mail.includes('com') || mail.includes('co.il') || mail.includes('net');
  }


  let GoToRegister = () => { navigation.navigate('דף הרשמה'); }

  let forgot = () => { set_isDialogVisible_Iforgot(true); }

  let getDetaildAndSendMail = async (mail) => {
    if (checkEmail(mail)) {
      let mailWithNoDots = mail.replace(".", "_");
      let goFetchPass = `http://proj.ruppin.ac.il/bgroup5/FinalProject/backEnd/api/AppUsers/GetUserPass/${mailWithNoDots}`

      fetch(goFetchPass)
      .then((response) => response.json())
      .then((userDetails) => {
        console.log("userMail: ",userDetails.UserMail);
        console.log("userPassword: ",userDetails.UserPassword);
     
        alert('סיסמתך נשלחה למייל שמזוהה אם המשתמש/ת שלך'); //not suported yet need to check how to do it in c# !!!
        set_isDialogVisible_Iforgot(false);
      })
      .catch((error) => {
        console.error(error);
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

        <Button title="רוצה ליצור משתמש ללא שימוש ברשת חברתית?" onPress={GoToRegister} />
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