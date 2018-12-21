import { STAR_CONTACT, EDIT_CONTACT, REMOVE_CONTACT } from '../actions/actionTypes';
import contactsMockupData from '../data/contacts-mockup-data.json';

const initialState = {
  contacts: contactsMockupData,
  favorites: []
};

/**
 * @param {Object} state
 * @param {Object} action
 * @returns {Object} - Updated contacts object
 */
export default function contactsReducer(state = initialState, action) {
  switch (action.type) {
    case STAR_CONTACT:
      return {
        ...state,
        favorites: [
          ...state.favorites,
          state.contacts.find(contact => contact.id === action.contactId)
        ]
      };

    case EDIT_CONTACT:
      var contactIndex = state.contacts.find(contact => contact.id === action.contactId);
      var updatedContacts = [...state.contacts];
      updatedContacts[contactIndex] = {
        ...updatedContacts[contactIndex],
        ...action.data
      };

      return {
        ...state,
        contacts: updatedContacts
      };

    case REMOVE_CONTACT:
      var removeContact = contact => contact.id !== action.contactId;

      return {
        ...state.contacts.filter(removeContact),
        ...state.favorites.filter(removeContact)
      };

    default:
      return state;
  }
}