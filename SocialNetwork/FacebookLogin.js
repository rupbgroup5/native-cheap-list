import React from 'react'
import * as  Facebook from 'expo-facebook'
import { SocialIcon } from 'react-native-elements'
import RedirectApp2Web from '../GlobalFunctions/RedirectApp2Web'
import insert from '../DBfunctions/Insert'
import getUserContacts from '../GlobalFunctions/getUserContacts'
import handleExpoRegisteration from '../PushNotifications/handleExpoRegisteration'
//Yogev's facebook 4 developers: https://developers.facebook.com/apps/314969959466534/dashboard/ 
const facebookAppID = '314969959466534';

let FacebookLogin = async () => {
    const contacts = await getUserContacts();
    const user = {};

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


            // check the DB is the user alrready register with facebook
            // must have the await so the user will get filled before the checking user.ID !== 0  will be valid
            await fetch(`http://proj.ruppin.ac.il/bgroup5/FinalProject/backEnd/api/AppUsers/GetExsistUserSocailID/${fbData.id}`)
                .then((response) => response.json())
                .then((userJson) => {
                    user.UserID = userJson.UserID;
                })
                .catch((error) => {
                    console.log(error);
                });

            if (user.UserID !== 0) { // so there is a user in the db
                user.Contacts = contacts;

                fetch("http://proj.ruppin.ac.il/bgroup5/FinalProject/backEnd/api/AppUsers/updateUserContacts", {
                    method: 'POST',
                    headers: new Headers({
                        'Content-type': 'application/json; charset=UTF-8'
                    }),
                    body: JSON.stringify(user)
                }).then(res => { return res.json(); })
                    .then(
                        (result) => {
                            console.log("result: ", result);
                        })
                    .catch((error) => {
                        console.log("error: ", error);
                    });
                handleExpoRegisteration(user.UserID);
                //RedirectApp2Web(user.ID);

            }
            else { //user has no social id aka his first login by facebook
                let newUser = {
                    SocialID: fbData.id,
                    UserName: fbData.name,
                    WayOf_Registration: 'facebook',
                    Contacts: contacts
                }
                let newInsertedUserID = await insert(newUser);
                console.log('this is the user id which updated in the db', newInsertedUserID);
                RedirectApp2Web(newInsertedUserID);
            }

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