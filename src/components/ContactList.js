import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ContactListTable from './ContactListTable';

class ContactList extends Component {
  render() {
    return (
      <Grid>
        <ContactListTable
          contacts={this.props.contacts.filter(contact => contact.starred)}
          title="Starred contacts"
        />
        <ContactListTable
          contacts={this.props.contacts}
          title="Contacts"
        />
      </Grid>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return { contacts: state.contacts };
}

export default connect(mapStateToProps)(ContactList);