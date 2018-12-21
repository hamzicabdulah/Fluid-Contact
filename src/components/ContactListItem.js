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
import { starContact, removeContact } from '../actions/contactActions';

class ContactListItem extends Component {
  state = {
    optionsMenu: null
  };

  render() {
    return (
      <TableRow>
        <TableCell
          align="right"
          padding="none"
          className="contact_avatar"
        >
          <Avatar alt={this.props.name} src={`https://robohash.org/${this.props.name}.png`} />
        </TableCell>

        <TableCell align="left" className="contact_full_name">
          {this.props.name}
        </TableCell>

        <TableCell className="contact_email">
          {this.props.email}
        </TableCell>

        <TableCell className="contact_phone_number">
          {this.props.phone_number}
        </TableCell>

        <TableCell align="right" className="contact_action_buttons">
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
            onClose={this.handleOptionsClose}
          >
            <MenuItem onClick={this.handleDeleteClick}>
              <ListItemIcon>
                <Icon>delete</Icon>
              </ListItemIcon>
              Delete
            </MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
    );
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
    // Modal should be opened here
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
  picture_url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone_number: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(ContactListItem);