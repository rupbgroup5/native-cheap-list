import * as WebBrowser from 'expo-web-browser'

const RedirectApp2Web = (user_name) => {
    WebBrowser.openBrowserAsync(`http://proj.ruppin.ac.il/bgroup5/FinalProject/frontEnd/#/TempPage/${user_name}`);
}

export default RedirectApp2Web