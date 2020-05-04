import Register4PN_AndGetToken_Async from "./Register4PN_AndGetToken_Async"

const handleExpoRegisteration = async (userID) => {
    let token = null;
    let isRegisterToday = null;
    let today = new Date().toLocaleString();
    console.log("today: ", today);


    await fetch(`http://proj.ruppin.ac.il/bgroup5/FinalProject/backEnd/api/AppUsers/IsExpoTokenUpdated/${userID}`)
        .then((response) => response.json())
        .then((result) => {
            isRegisterToday = result
        })
        .catch((error) => {
            console.log(error);
        });


    if (!isRegisterToday) {
        token = await Register4PN_AndGetToken_Async();
        let userUpdateFields = {
            UserID: userID,
            ExpoToken: token,
            DateOfLast_Register: today

        }
        fetch("http://proj.ruppin.ac.il/bgroup5/FinalProject/backEnd/api/AppUsers/updateUserExpoToken", {
            method: 'POST',
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8'
            }),
            body: JSON.stringify(userUpdateFields)
        }).then(res => { return res.json(); })
            .then(
                (result) => {
                    console.log(result);
                })
            .catch((error) => {
                console.log(error);
            });
        console.log("cheap list system updated the user's expo token.");
    } else {
        console.log("cheap list system has decided not to update this user's expo token since its not his first login today");

    }
}

export default handleExpoRegisteration;
