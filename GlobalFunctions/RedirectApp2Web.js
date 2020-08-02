import * as WebBrowser from 'expo-web-browser'
import UpdateUserCordinates from './UpdateUserCordinates'

const RedirectApp2Web = async (user) => {
    await UpdateUserCordinates(user.UserID);
    if (user.UserName === user.PhoneNumber) {
        WebBrowser.openBrowserAsync(
            `http://proj.ruppin.ac.il/bgroup5/FinalProject/frontEnd/#/HomePage/${user.UserID}`
        );
    }else{
        WebBrowser.openBrowserAsync(
            `http://proj.ruppin.ac.il/bgroup5/FinalProject/frontEnd/#/HomePage/${user.UserID}`
        );
    }
  
}

export default RedirectApp2Web