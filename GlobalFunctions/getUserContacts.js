import * as Contacts from 'expo-contacts';

const getUserContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync();

        let contactsArray = [];

        data.forEach((contact) => {
            let contactObj = {};
            contactObj.Name = `${contact.firstName} ${contact.lastName !== undefined ? contact.lastName : ''}`;

            if (contactObj.Name !== undefined && contact.phoneNumbers !== undefined) { //only contacts with name and numbers will get in our array
                contactObj.PhoneNumber = contact.phoneNumbers[0].number;
                contactsArray.push(contactObj);
            }
            // if (contact.emails !== undefined) {
            //     contactObj.Mail = contact.emails[0].email;              ---> MAKES A LOT OF NULLS IN THE SQL
            // }                                                        
        })

        contactsArray.forEach((c) => {
            console.log(c);
        });






        // console.log(
        //     `contects length: `, contactsArray.length,
        //     `contacts-list: `, contactsArray
        // );
        //it looks like this:
        /**
         * contacts-list:  Array [
                                    Object {
                                        "Name": "Aviad Pardo",
                                        "PhoneNumber": "0507394264",
                                        "userEmail": "example@gmail,com",
                                    },
                                    Object {... 
                                ]
         */

    }

}

export default getUserContacts;
