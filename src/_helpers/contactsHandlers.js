export const splitContacts = contacts => {
  const emails = [];
  const phoneNumbers = [];
  const socialNetworks = [];
  for (let contact of contacts) {
    switch (contact.method_id) {
      case 1:
        emails.push(contact);
        break;
      case 2:
        phoneNumbers.push(contact);
        break;
      case 3:
        socialNetworks.push(contact);
        break;
      default:
        console.log('unknown contact detected');
    }
  }
  return { emails, phoneNumbers, socialNetworks };
};

export const tagContact = contact => {
  switch (contact.method_id) {
    case 1:
      return { contactType: 'emails', contact };
    case 2:
      return { contactType: 'phoneNumbers', contact };
    case 3:
      return { contactType: 'socialNetworks', contact };
    default:
      console.log('unknown contact detected');
  }
};

export const findContactById = ({ contact_id, contactsCategories }) => {
  for (let category in contactsCategories) {
    const idx = contactsCategories[category].findIndex(contact => contact.id === contact_id);
    if (idx >= 0) {
      return { categoryName: category, category: contactsCategories[category], idx };
    }
  }
};
