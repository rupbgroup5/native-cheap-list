


import Register4PN_AndGetToken_Async from "./PushNotifications/Register4PN_AndGetToken_Async"
import { Notifications } from 'expo'


const handleExpoRegisteration = (userID) => {
    let token = null;
    let notificationOnDevice = null;
    let firstLoginToday = null; //fetch from db by the userID and get true or false if the register done today or not

    if (firstLoginToday) {
        token = await Register4PN_AndGetToken_Async();
        Notifications.addListener(HandleNotification);
    }



    const HandleNotification = (notificationFromCloud) => {
        notificationOnDevice = notificationFromCloud;
    }

}

export default handleExpoRegisteration;
