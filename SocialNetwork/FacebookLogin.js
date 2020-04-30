import React from 'react'
import * as  Facebook from 'expo-facebook'
import { SocialIcon } from 'react-native-elements'
import RedirectApp2Web from '../GlobalFunctions/RedirectApp2Web'
import insert from '../DBfunctions/Insert'
import getUserContacts from '../GlobalFunctions/getUserContacts'

//Yogev's facebook 4 developers: https://developers.facebook.com/apps/314969959466534/dashboard/ 
const facebookAppID = '314969959466534';

let FacebookLogin = async () => {
    const contacts = await getUserContacts();

    try {
        await Facebook.initializeAsync(facebookAppID);
        const { type, token
            // , expires, permissions, declinedPermissions
        } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile']
        });
        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
            const fbData = await response.json();



            fetch(`http://proj.ruppin.ac.il/bgroup5/FinalProject/backEnd/aapi/AppUsers/GetExsistUserSocailID/${fbData.id}`)
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                })
                .catch((error) => {
                    //  console.log(error);
                    console.log('כאן אני יכול לעשות מה שאני רוצה');

                });


            // fetch(`http://proj.ruppin.ac.il/bgroup5/FinalProject/backEnd/aapi/AppUsers/GetExsistUserSocailID/${fbData.id}`)
            //     .then((response) => response.json())
            //     .then((userDetails) => {
            //         console.log(userDetails);

            //         // if (userDetails === "there is no user with the provided socailID") {
            //         //     let newUser = {
            //         //         SocialID: fbData.id,
            //         //         UserName: fbData.name,
            //         //         WayOf_Registration: 'facebook',
            //         //         Contacts: contacts,
            //         //     }

            //         //     console.log(newUser);


            //         // } else {

            //         // }
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
            // RedirectApp2Web(fbData.name);


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