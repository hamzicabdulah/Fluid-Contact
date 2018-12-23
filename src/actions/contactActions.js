import {
  STAR_CONTACT,
  EDIT_CONTACT,
  REMOVE_CONTACT,
  CREATE_CONTACT
} from './actionTypes';

/**
 * Return an action that is used to add a contact to starred contacts
 * 
 * @param {String} contactId 
 * @returns {Object}
 */
export function starContact(contactId) {
  return { type: STAR_CONTACT, contactId };
}

/**
 * @param {String} contactId 
 * @param {Object} data - The updated contact data
 * @returns {Object}
 */
export function editContact(contactId, data) {
  return { type: EDIT_CONTACT, contactId, data };
}

/**
 * @param {String} contactId 
 * @returns {Object}
 */
export function removeContact(contactId) {
  return { type: REMOVE_CONTACT, contactId };
}

/**
 * @param {Object} contactData
 * @returns {Object}
 */
export function createContact(contactData) {
  return { type: CREATE_CONTACT, contactData };
}