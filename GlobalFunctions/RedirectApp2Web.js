import * as WebBrowser from 'expo-web-browser'

const RedirectApp2Web = (transportUserData) => {
    WebBrowser.openBrowserAsync(`http://proj.ruppin.ac.il/bgroup5/FinalProject/frontEnd/#/HomePage/${transportUserData}`);
}

export default RedirectApp2Web