let backEnDApiUrl = 'http://proj.ruppin.ac.il/bgroup5/FinalProject/backEnd/api/AppUsers/PostUser';

const insert = async (userDetails) => {
    let returnValue = 0;
    await fetch(backEnDApiUrl, {
        method: 'POST',
        headers: new Headers({
            'Content-type': 'application/json; charset=UTF-8'
        }),
        body: JSON.stringify(userDetails),
    })
        .then((response) => response.json())
        .then((json) => {
            returnValue = json;
        })
        .catch((error) => {
            console.error('some error catched ', error);
        });
    return (returnValue);

}

export default insert