let backEnDApiUrl = 'http://proj.ruppin.ac.il/bgroup5/FinalProject/backEnd/api/AppUsers/PostUser/{newUser}';

const insert = (userDetails) => {
    fetch(backEnDApiUrl, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(userDetails),
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
        })
        .catch((error) => {
            console.error('some error catched ', error);
        });

}

export default insert











