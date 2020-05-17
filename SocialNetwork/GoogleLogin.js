import React from 'react';
import { SocialIcon } from 'react-native-elements'
import * as Google from 'expo-google-app-auth'
import getUserContacts from "../GlobalFunctions/getUserContacts"
import RedirectApp2Web from '../GlobalFunctions/RedirectApp2Web'
import insert from '../DBfunctions/Insert'
import handleExpoRegisteration from '../PushNotifications/handleExpoRegisteration';
import Register4PN_AndGetToken_Async from '../PushNotifications/Register4PN_AndGetToken_Async';



const config = { androidClientId: `165128669288-5afsahev8obo4h0ab6eusou5rkn4qgi7.apps.googleusercontent.com` } //,
let appUser = {}

let GoogleLogin = async () => {
    let contacts = await getUserContacts();

    try {
        const { type, accessToken, user } = await Google.logInAsync(config); // user must be name user or else the api will not work !!!

        if (type === 'success') {
            await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            //check the DB is the user alrready register with google
            //must have the await so the user will get filled before the checking user.ID !== 0  will be valid
            await fetch(`http://proj.ruppin.ac.il/bgroup5/FinalProject/backEnd/api/AppUsers/GetExsistUserSocailID/${user.id}`)
                .then((response) => response.json())
                .then((userJson) => {
                    appUser.UserID = userJson.UserID;
                })
                .catch((error) => {
                    console.log(error);
                });
            if (appUser.UserID !== 0) { // so there is a user in the db
                appUser.Contacts = contacts;

                fetch("http://proj.ruppin.ac.il/bgroup5/FinalProject/backEnd/api/AppUsers/updateUserContacts", {
                    method: 'POST',
                    headers: new Headers({
                        'Content-type': 'application/json; charset=UTF-8'
                    }),
                    body: JSON.stringify(appUser)
                }).then(res => { return res.json(); })
                    .then(
                        (result) => {
                            console.log(result);
                        })
                    .catch((error) => {
                        console.log(error);
                    });
                console.log("redirect to web with id: ", appUser.UserID);

                RedirectApp2Web(appUser.UserID);
                handleExpoRegisteration(appUser.UserID);

            } else { //user has no social id aka his first login by google
                let token = await Register4PN_AndGetToken_Async();
                let newUser = {
                    SocialID: user.id,
                    UserName: user.name,
                    UserMail: user.email,
                    WayOf_Registration: 'google',
                    Contacts: contacts,
                    ExpoToken: token
                }
                let newInsertedUserID = await insert(newUser);
                console.log('this is the user id which updated in the db', newInsertedUserID);
                RedirectApp2Web(newInsertedUserID);
            }

            //if I wants to obtain an img: --> googleUser.photoUrl

            //future to be automatic if the user is allready exist. direct login without pushing the button
            // insert(newUser);
        } else {
            console.log('user doesnt aprove using his google details');
        }
    } catch (error) {
        console.log(`some error occured in google login: ${error}`);
    }
}

const GoogleLoginBtn = () => {
    return (
        <SocialIcon title='כנס באמצעות גוגל' button type='google' onPress={GoogleLogin} />
    );
}

export default GoogleLoginBtn;






