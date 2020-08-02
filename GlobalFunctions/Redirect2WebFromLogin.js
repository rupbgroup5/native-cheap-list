import * as WebBrowser from 'expo-web-browser'
import UpdateUserCordinates from './UpdateUserCordinates'

const Redirect2WebFromLogin = async (userID) => {
    console.log('userID', userID);
    await UpdateUserCordinates(userID);
    WebBrowser.openBrowserAsync(
        `http://proj.ruppin.ac.il/bgroup5/FinalProject/frontEnd/#/UserProfile/${userID}`
    );
    
}

export default Redirect2WebFromLogin