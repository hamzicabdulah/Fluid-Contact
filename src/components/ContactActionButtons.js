import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Grid from '@material-ui/core/Grid';
import { starContact, removeContact } from '../actions/contactActions';

class ContactActionButtons extends Component {
  state = {
    optionsMenu: null,
  };

  render() {
    return (
      <Grid className="contact_action_buttons" style={this.props.style}>
        <IconButton
          aria-label="Starred"
          className="contact_starred_button"
          onClick={this.handleStarClick}
        >
          <Icon>{this.props.starred ? 'star' : 'star_border'}</Icon>
        </IconButton>

        <IconButton
          aria-label="Edit"
          className="contact_edit_button"
          onClick={this.props.handleEditClick}
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

        {this.props.additionalButtons}

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
    );
  }

  /**
   * Add this contact to starred contacts
   */
  handleStarClick = () => {
    this.props.dispatch(starContact(this.props.id));
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
    if (this.props.handleTableRowMouseOut) this.props.handleTableRowMouseOut();
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

ContactActionButtons.propTypes = {
  id: PropTypes.number.isRequired,
  starred: PropTypes.bool.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  style: PropTypes.object,
  handleTableRowMouseOut: PropTypes.func,
  additionalButtons: PropTypes.array,
  dispatch: PropTypes.func.isRequired
};

export default connect()(ContactActionButtons);