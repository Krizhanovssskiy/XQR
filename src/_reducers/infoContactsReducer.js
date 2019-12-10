import {
  splitContacts,
  tagContact,
  findContactById
} from '../_helpers/contactsHandlers';

import {
  POPULATE_CONTACTS,
  CREATE_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT
} from '../_actions/types';

const INITIAL_STATE = {
  emails: [],
  phoneNumbers: [],
  socialNetworks: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POPULATE_CONTACTS:
      const contactsList = splitContacts(action.payload);
      return { ...state, ...contactsList };

    case CREATE_CONTACT:
      const createdData = tagContact(action.payload);
      return {
        ...state,
        [createdData.contactType]: [
          ...state[createdData.contactType],
          createdData.contact
        ]
      };

    case UPDATE_CONTACT:
      const updatedData = tagContact(action.payload);
      const updatedContactsCategory = [...state[updatedData.contactType]];
      const updateIdx = updatedContactsCategory.findIndex(
        contact => contact.id === updatedData.contact.id
      );
      updatedContactsCategory[updateIdx] = updatedData.contact;
      return {
        ...state,
        [updatedData.contactType]: updatedContactsCategory
      };

    case DELETE_CONTACT:
      const contact_id = action.payload;
      const contactsCategories = {
        emails: state.emails,
        phoneNumbers: state.phoneNumbers,
        socialNetworks: state.socialNetworks
      };
      const { categoryName } = findContactById({
        contact_id,
        contactsCategories
      });
      return {
        ...state,
        [categoryName]: state[categoryName].filter(contact => contact.id !== contact_id)
      };

    default:
      return state;
  }
};
