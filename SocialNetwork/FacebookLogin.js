import React from 'react'
import * as  Facebook from 'expo-facebook'
import { SocialIcon } from 'react-native-elements'
import RedirectApp2Web from '../GlobalFunctions/RedirectApp2Web'
import insert from '../DBfunctions/Insert'

//Yogev's facebook 4 developers: https://developers.facebook.com/apps/314969959466534/dashboard/ 
const facebookAppID = '314969959466534';

let FacebookLogin = async () => {
    try {
        await Facebook.initializeAsync(facebookAppID);
        const { type, token
            //, expires, permissions, declinedPermissions
        } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile']
        });
        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
            const fbData = await response.json();


            let newUser = {
                UserName: fbData.name,
                UserMail: 'user loged in with facebook'
            }
            insert(newUser);
            RedirectApp2Web(fbData.name);
        } else {
            console.log('user doesnt aprove using his facebook details');
        }
    } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`)
    }
}
const FaceBookLoginBtn = () => {
    return (
        <SocialIcon title='כנס באמצעות פייסבוק' button type='facebook' onPress={FacebookLogin} />
    );

}

export default FaceBookLoginBtn