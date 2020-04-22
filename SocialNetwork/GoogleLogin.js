import React from 'react';
import { SocialIcon } from 'react-native-elements'
import * as Google from 'expo-google-app-auth'
import RedirectApp2Web from '../GlobalFunctions/RedirectApp2Web'
import insert from '../DBfunctions/Insert'


const config = {
    androidClientId: `165128669288-5afsahev8obo4h0ab6eusou5rkn4qgi7.apps.googleusercontent.com`,
}
let newUser = {
    UserName: "",
    UserMail: "",
}

let GoogleLogin = async () => {
    const { type, accessToken, user } = await Google.logInAsync(config);

    if (type === 'success') {
        await fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        newUser.UserName = user.name;
        newUser.UserMail = user.email;
        console.log(newUser.UserName + " " + newUser.UserMail);

        //if I wants to obtain an img: --> newUser.photoUrl = user.photoUrl;

        //need to add check if the user is allready in the data base...
        //if exist → login if not → reg + login
        //future to be automatic if the user is allready exist.
        // insert(newUser);
        RedirectApp2Web(newUser.UserName);
    }
}

const GoogleLoginBtn = () => {
    return (
        <SocialIcon title='כנס באמצעות גוגל' button type='google' onPress={GoogleLogin} />
    );
}

export default GoogleLoginBtn;






