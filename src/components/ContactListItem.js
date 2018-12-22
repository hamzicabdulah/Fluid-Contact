import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Grid from '@material-ui/core/Grid';
import { starContact, removeContact } from '../actions/contactActions';
import ContactFormModal from './ContactFormModal';

class ContactListItem extends Component {
  state = {
    optionsMenu: null,
    showActionButtons: false,
    showContactFormModal: false
  };

  fullName = `${this.props.firstName} ${this.props.lastName}`;

  render() {
    return (
      <TableRow
        hover={true}
        onMouseOver={this.handleTableRowHover}
        onMouseOut={this.handleTableRowMouseOut}
      >
        <TableCell padding="dense" className="contact_first_letter">
          {this.props.firstOfLetter ? <h2>{this.props.firstName[0]}</h2> : <Icon />}
        </TableCell>

        <TableCell
          align="right"
          padding="none"
          className="contact_avatar"
        >
          <Avatar
            alt={this.fullName}
            src={getRandomAvatar(this.fullName)}
          />
        </TableCell>

        <TableCell align="left" className="contact_full_name">
          {this.fullName}
        </TableCell>

        <TableCell className="contact_email">
          {this.props.email}
        </TableCell>

        <TableCell className="contact_phone_number">
          {this.props.phoneNumber}
        </TableCell>

        <TableCell
          align="right"
          className="contact_action_buttons"
        >
          <Grid style={this.state.showActionButtons ? {} : { visibility: 'hidden' }}>
            <IconButton
              aria-label="Favorite"
              className="contact_favorite_button"
              onClick={this.handleStarClick}
            >
              <Icon>{this.props.favorite ? 'star' : 'star_border'}</Icon>
            </IconButton>

            <IconButton
              aria-label="Edit"
              className="contact_edit_button"
              onClick={this.handlePenClick}
            >
              <Icon>create</Icon>
            </IconButton>

            <IconButton
              aria-owns={this.state.optionsMenu ? 'options-menu' : undefined}
              aria-haspopup="true"
              aria-label="Options"
              className="contact_options_button"
              onClick={this.handleOptionsClick}
            >
              <Icon>more_vert</Icon>
            </IconButton>

            <Menu
              id="option-menu"
              anchorEl={this.state.optionsMenu}
              open={Boolean(this.state.optionsMenu)}
              className="options_menu"
              onClose={this.handleOptionsClose}
            >
              <MenuItem className="remove_button" onClick={this.handleDeleteClick}>
                <ListItemIcon>
                  <Icon className="remove_icon">delete</Icon>
                </ListItemIcon>
                Delete
              </MenuItem>
            </Menu>
          </Grid>
        </TableCell>
        <ContactFormModal
          {...this.props}
          open={this.state.showContactFormModal}
          handleClose={this.handleContactFormModalClose}
          new={false}
        />
      </TableRow>
    );
  }

  /**
   * Show contact item action buttons
   */
  handleTableRowHover = () => {
    this.setState({ showActionButtons: true });
  }

  /**
   * Hide contact item action buttons
   */
  handleTableRowMouseOut = () => {
    this.setState({ showActionButtons: false });
  }

  /**
   * Add this contact to favorites
   */
  handleStarClick = () => {
    this.props.dispatch(starContact(this.props.id));
  }

  /**
   * Open modal for contact editing
   */
  handlePenClick = () => {
    this.setState({ showContactFormModal: true });
  }

  /**
   * Close modal for contact editing
   */
  handleContactFormModalClose = () => {
    this.setState({ showContactFormModal: false });
  }

  /**
   * Open options menu
   * 
   * @param {Object} event
   */
  handleOptionsClick = (event) => {
    this.setState({ optionsMenu: event.currentTarget });
  }

  /**
   * Close options menu
   */
  handleOptionsClose = () => {
    this.setState({ optionsMenu: null });
  }

  /**
   * Remove this contact from the list and close the opened menu
   */
  handleDeleteClick = () => {
    this.handleOptionsClose();
    this.props.dispatch(removeContact(this.props.id));
  }
}

ContactListItem.propTypes = {
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string,
  email: PropTypes.string,
  phoneNumber: PropTypes.string.isRequired,
  company: PropTypes.string,
  jobTitle: PropTypes.string,
  notes: PropTypes.string,
  favorite: PropTypes.bool.isRequired,
  firstOfLetter: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

/**
 * @param {String} name 
 * @returns {String} - Avatar image URL
 */
function getRandomAvatar(name) {
  return `https://robohash.org/${name}.png`;
}

export default connect()(ContactListItem);