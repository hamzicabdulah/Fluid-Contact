import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import ContactListItem from './ContactListItem';
import ContactFormModal from './ContactFormModal';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { editContact } from '../actions/contactActions';

class ContactList extends Component {
  state = {
    showContactFormModal: false,
    contactToEdit: null
  }

  render() {
    return (
      <Grid>
        {
          this.ContactListTable(
            this.props.contacts.filter(contact => contact.starred),
            'Starred contacts'
          )
        }
        {this.ContactListTable(this.props.contacts, 'Contacts')}
        {
          this.state.showContactFormModal &&
          <ContactFormModal
            {...this.state.contactToEdit}
            handleClose={this.handleContactFormModalClose}
            new={!this.state.contactToEdit}
          />
        }
        <Fab
          color="secondary"
          aria-label="Add"
          className="create_contact_button"
          onClick={() => this.handleContactFormModalOpen()}
        >
          <AddIcon />
        </Fab>
      </Grid>
    );
  }

  /**
   * Create a Material UI table with the given contacts and title
   * 
   * @param {Object[]} contacts
   * @param {String} title
   */
  ContactListTable = (contacts, title) => {
    let contactsSorted = [...contacts].sort((previousContact, currentContact) => {
      return (
        previousContact.firstName.toLowerCase() >
        currentContact.firstName.toLowerCase()
      ) ? 1 : -1;
    });

    return (
      <Table className="contacts_list">
        <TableHead>
          <TableRow>
            <TableCell className="contacts_title" colSpan={6}>
              {title} ({contacts.length})
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            contactsSorted.map((contact, index) =>
              <ContactListItem
                {...contact}
                firstOfLetter={
                  !contactsSorted[index - 1] ||
                  contact.firstName[0].toLowerCase() !==
                  contactsSorted[index - 1].firstName[0].toLowerCase()
                }
                key={contact.id}
                handlePenClick={() => this.handleContactFormModalOpen(contact)}
              />
            )
          }
        </TableBody>
      </Table>
    );
  }

  /**
   * Open the form modal to edit the given contact
   * 
   * @param {Object} contact
   */
  handleContactFormModalOpen = (contact) => {
    this.setState({
      showContactFormModal: true,
      contactToEdit: contact
    });
  }

  /**
   * Close the form modal
   */
  handleContactFormModalClose = () => {
    this.setState({
      showContactFormModal: false,
      contactToEdit: null
    });
  }

  /**
   * Update the contact or create a new one in the state
   */
  handleContactSave = (contactId, contactData) => {
    this.props.dispatch(editContact(contactId, contactData));
    this.props.handleClose();
  };
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  contacts: state.contacts
});

export default connect(mapStateToProps)(ContactList);