import React from 'react';
import { SocialIcon } from 'react-native-elements'
import * as Google from 'expo-google-app-auth'
import RedirectApp2Web from '../GlobalFunctions/RedirectApp2Web'



const config = {
    androidClientId: `165128669288-5afsahev8obo4h0ab6eusou5rkn4qgi7.apps.googleusercontent.com`,
}
let newUser = {
    name: "",
    email: "",
    photoUrl: "",
}

let GoogleLogin = async () => {
    const { type, accessToken, user } = await Google.logInAsync(config);

    if (type === 'success') {
        await fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        newUser.name = user.name;
        newUser.email = user.email;
        newUser.photoUrl = user.photoUrl;

    }
}

const GoogleLoginBtn = () => {
    return (
        <SocialIcon title='כנס באמצעות גוגל' button type='google' onPress={GoogleLogin} />
    );
}

export default GoogleLoginBtn;






