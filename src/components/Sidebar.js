import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

class Sidebar extends Component {
  render() {
    return (
      <List className="sidebar">
        <ListItem button selected className="sidebar_contacts_button">
          <ListItemIcon className="sidebar_contacts_icon">
            <Icon>contacts</Icon>
          </ListItemIcon>
          <ListItemText
            primary={`Contacts (${this.props.contacts.length})`}
            className="sidebar_contacts_button_text"
          />
        </ListItem>

        <Divider className="sidebar_divider" />

        <ListItem button className="sidebar_settings_button">
          <ListItemIcon className="sidebar_settings_icon">
            <Icon>settings</Icon>
          </ListItemIcon>
          <ListItemText primary="Settings" className="sidebar_settings_button_text" />
        </ListItem>

        <ListItem button className="sidebar_help_button">
          <ListItemIcon className="sidebar_help_icon">
            <Icon>help</Icon>
          </ListItemIcon>
          <ListItemText primary="Help" className="sidebar_settings_button_text" />
        </ListItem>
      </List>
    );
  }
}

Sidebar.propTypes = {
  contacts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  contacts: state.contacts
});

export default connect(mapStateToProps)(Sidebar);