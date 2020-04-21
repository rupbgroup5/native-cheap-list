import * as Contacts from 'expo-contacts';

const getUserContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync();
        let contactsArray = [];

        data.forEach((contact) => {
            let contactObj = {};
            contactObj.Name = `${contact.firstName} ${contact.lastName !== undefined ? contact.lastName : ''}`
            contactObj.PhoneNumber = contact.phoneNumbers !== undefined ? contact.phoneNumbers[0].number : 'no-number'
            contactsArray.push(contactObj);

        })
        console.log(
            `contects length: `, contactsArray.length,
            `contacts-list: `, contactsArray
        );

    }

}

export default getUserContacts;
