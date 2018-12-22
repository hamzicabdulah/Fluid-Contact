import { STAR_CONTACT, EDIT_CONTACT, REMOVE_CONTACT } from '../actions/actionTypes';
import contactsMockupData from '../data/contacts-mockup-data.json';
const initialState = contactsMockupData.map(contact => {
  return { ...contact, starred: false };
});

/**
 * @param {Object} state
 * @param {Object} action
 * @returns {Object} - Updated contacts object
 */
export default function contactsReducer(state = initialState, action) {
  switch (action.type) {
    case STAR_CONTACT: {
      const contactIndex = state.findIndex(contact => contact.id === action.contactId);
      const updatedContacts = [...state];
      updatedContacts[contactIndex] = {
        ...updatedContacts[contactIndex],
        starred: !updatedContacts[contactIndex].starred
      };

      return updatedContacts;
    }

    case EDIT_CONTACT: {
      const contactIndex = state.findIndex(contact => contact.id === action.contactId);
      const updatedContacts = [...state];
      updatedContacts[contactIndex] = {
        ...updatedContacts[contactIndex],
        ...action.data
      };

      return updatedContacts;
    }

    case REMOVE_CONTACT: {
      return state.filter(contact => contact.id !== action.contactId);
    }

    default:
      return state;
  }
}