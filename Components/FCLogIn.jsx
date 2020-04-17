import React, { useState } from 'react'
import {
  Button,
  TouchableOpacity,
  StyleSheet,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Input } from 'react-native-elements'
import RedirectApp2Web from '../GlobalFunctions/RedirectApp2Web'
//import insert from '../GlobalFunctions/RedirectApp2Web' for when I get the contacts...


//social media:
import FaceBookLoginBtn from '../SocialNetwork/FacebookLogin'
import GoogleLoginBtn from '../SocialNetwork/GoogleLogin'




export default function App({ navigation }) {
  let userName = "";
  let password = "";

  const [secureTextEntryToggle, set_secureTextEntryToggle] = useState(true);
  const [eye, set_eye] = useState('eye-slash');

  //onChange:
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

    //#region EXPORT TO REGISTER PAGE
    /* 
        let userAuthentication = {
          UserName: userName,
          UserPassword: password,
          UserMail: 'temp@expermental@gmail.com',
          UserAdress: 'Experemntal City',
        }
        post expermental data to our db (future to be contacts list with proper key)
        insertData2DB(userAuthentication); KNOW THAT THIS IS WORKING WHEN I NEED IT TO THE REGISTER PAGE
        send the key which tell the web wich info it should fetch:
        YET 2 BE PROGRAMED !!!
    endregion*/
    //#endregion

    RedirectApp2Web(userName);
  }


  let GoToRegister = () => {
    navigation.navigate('Cheap List Register');
  }

  return (
    <View style={styles.container}>
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

});