import { Notifications } from 'expo'
import registerForPushNotificationsAsync from './registerForPushNotificationsAsync'


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notification: {},
        };
    }
