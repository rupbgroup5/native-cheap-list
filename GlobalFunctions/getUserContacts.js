import * as Contacts from 'expo-contacts';

const getUserContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync();

        let contactsArray = [];

        data.forEach((contact) => {
            let contactObj = {};
            contactObj.Name = `${contact.firstName} ${contact.lastName !== undefined ? contact.lastName : ''}`;

            //#region  c# is much better
            // let tempName = 
            // if (tempName.includes(`"`)) {
            //     contactObj.Name = tempName.replace(`"`, `'`);
            // } else {
            //     contactObj.Name = tempName;
            // }
            //#endregion

            if (contactObj.Name !== undefined && contact.phoneNumbers !== undefined) { //only contacts with name and numbers will get in our array
                contactObj.PhoneNumber = contact.phoneNumbers[0].number;
                contactsArray.push(contactObj);
            }
        })
        return contactsArray;
    }

}

export default getUserContacts;
