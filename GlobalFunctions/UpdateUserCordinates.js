import * as Location from 'expo-location'

const UpdateUserCordinates = async (ID) => {
    let backEnDApiUrl = 'http://proj.ruppin.ac.il/bgroup5/FinalProject/backEnd/api/AppUsers/UpdateUserCoords';

    let { status } = await Location.requestPermissionsAsync();

    if (status !== 'granted') {
        console.log('user declined location permission');
    } else {
        let location = await Location.getCurrentPositionAsync({});

        let user = {
            UserID: ID,
            Longitude: location.coords.longitude,
            Latitude: location.coords.latitude
        }

        fetch(backEnDApiUrl, {
            method: 'POST',
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8'
            }),
            body: JSON.stringify(user),
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
            })
            .catch((error) => {
                console.log('some error catched ', error);
            });
    }

}
export default UpdateUserCordinates;