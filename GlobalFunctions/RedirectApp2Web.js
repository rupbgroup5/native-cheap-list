import * as WebBrowser from 'expo-web-browser'
import UpdateUserCordinates from './UpdateUserCordinates'

const RedirectApp2Web = async (userID) => {

    await UpdateUserCordinates(userID);
    
    WebBrowser.openBrowserAsync(
        `http://proj.ruppin.ac.il/bgroup5/FinalProject/frontEnd/#/HomePage/${userID}`
    );
    
}

export default RedirectApp2Web