import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'



const Register4PN_AndGetToken_Async = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    // only ask if permissions have not already been determined, because iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
        console.log('user did not granted permissions for NOTIFICATIONS');
        return;
    }
    // Get the token that uniquely identifies the user's device
    let token = await Notifications.getExpoPushTokenAsync();
    let Register_Date_numberRepresntation = new Date().valueOf();//Returns the stored time value in milliseconds since midnight, January 1, 1970 UTC.
    //post database for the Register_Date_numberRepresntation and store the token
    return (token); //I dont think I need to return the token since the use of pn is in the react js

}

export default Register4PN_AndGetToken_Async;
