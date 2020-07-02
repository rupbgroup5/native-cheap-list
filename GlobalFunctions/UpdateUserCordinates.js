

const UpdateUserCordinates = (userID) => {

    let longitude;
    let latitude;


    navigator.geolocation.getCurrentPosition(position => {

        longitude = position.coords.longitude;
        latitude = position.coords.latitude;



        // let backEnDApiUrl = 'http://proj.ruppin.ac.il/bgroup5/FinalProject/backEnd/api/AppUsers/ ??? ';

        // await fetch(backEnDApiUrl, {
        //     method: 'POST',
        //     headers: new Headers({
        //         'Content-type': 'application/json; charset=UTF-8'
        //     }),
        //     body: JSON.stringify(userDetails),
        // })
        //     .then((response) => response.json())
        //     .then((json) => {
        //         console.log(json);

        //     })
        //     .catch((error) => {
        //         console.error('some error catched ', error);
        //     });


















    })
}
export default UpdateUserCordinates;