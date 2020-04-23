import React, { useState } from 'react'
import { Button, TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Input } from 'react-native-elements'
import RedirectApp2Web from '../GlobalFunctions/RedirectApp2Web'
import DialogInput from 'react-native-dialog-input';
import getUserContacts from "../GlobalFunctions/getUserContacts";


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
//   const getUserContacts = async () => {
//     const { status } = await Contacts.requestPermissionsAsync();
//     if (status === 'granted') {
//         const { data } = await Contacts.getContactsAsync();

//         let contactsArray = [];

//         data.forEach((contact) => {
//             let contactObj = {};
//             contactObj.Name = `${contact.firstName} ${contact.lastName !== undefined ? contact.lastName : ''}`;

//             if (contactObj.Name !== undefined && contact.phoneNumbers !== undefined) { //only contacts with name and numbers will get in our array
//                 contactObj.PhoneNumber = contact.phoneNumbers[0].number;
//                 contactsArray.push(contactObj);
//             }
//           })
//           console.log(contactsArray);
//     }

// }

  let LogIn = async () => {
     let contacts = await getUserContacts();

    fetch(`http://proj.ruppin.ac.il/bgroup5/FinalProject/backEnd/api/AppUsers/AuthenticateUserLogin/${userName}/${password}`)
    .then((response) => response.json())
    .then((userDetails) => {
      if (userDetails === null) {
        alert('שם משתמש/סיסמא שגויים');
      } else {
        // console.log(userDetails);
        // console.log(userDetails.Contacts);
        
        userDetails.Contacts = contacts;
        //UPDATE THE USER'S CONTACTS LIST:
       
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
            },
            (error) => {
              console.log(error)
            })

        RedirectApp2Web(userDetails.UserID);   
      }
    })
    .catch((error) => {
      console.log(error);
    });


   
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