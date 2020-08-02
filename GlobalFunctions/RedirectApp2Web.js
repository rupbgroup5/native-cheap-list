import * as WebBrowser from 'expo-web-browser'
import UpdateUserCordinates from './UpdateUserCordinates'

const RedirectApp2Web = async (user) => {

    const go2Browser = async (user) => {
        if (user.UserName === user.PhoneNumber) {
            WebBrowser.openBrowserAsync(
                `http://proj.ruppin.ac.il/bgroup5/FinalProject/frontEnd/#/HomePage/${user.UserID}`
            );
        } else {
            WebBrowser.openBrowserAsync(
                `http://proj.ruppin.ac.il/bgroup5/FinalProject/frontEnd/#/HomePage/${user.UserID}`
            );
        }
    }

    await UpdateUserCordinates(user.UserID);

    await go2Browser(user);



}

export default RedirectApp2Web