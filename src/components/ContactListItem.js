import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Media from 'react-media';
import ContactInfoModal from './ContactInfoModal';
import ContactActionButtons from './ContactActionButtons';

class ContactListItem extends Component {
  state = {
    optionsMenu: null,
    showActionButtons: false,
    contactInfoModalOpen: false
  };

  render() {
    return (
      <TableRow
        hover={true}
        onMouseOver={this.handleTableRowHover}
        onMouseOut={this.handleTableRowMouseOut}
        onClick={this.handleContactListItemClick}
        className="contact_list_item"
      >
        <TableCell padding="dense" className="contact_first_letter">
          {this.props.firstOfLetter ? <h2>{this.props.firstName[0].toUpperCase()}</h2> : <Icon />}
        </TableCell>

        <TableCell
          align="right"
          padding="none"
          className="contact_avatar"
        >
          <Avatar
            alt={this.props.firstName[0].toUpperCase()}
            src={this.getRandomAvatar()}
          />
        </TableCell>

        <TableCell align="left" className="contact_full_name">
          {this.props.firstName} {this.props.lastName}
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
          onClick={this.ignoreParentClickEvent}
        >
          <Media query="(max-width: 968px)">
            {matches =>
              matches ? (
                <ContactActionButtons
                  {...this.props}
                  style={{visibility: 'visible'}}
                  handleTableRowMouseOut={this.handleTableRowMouseOut}
                />
              ) : (
                <ContactActionButtons
                  {...this.props}
                  style={this.state.showActionButtons ? {} : { visibility: 'hidden' }}
                  handleTableRowMouseOut={this.handleTableRowMouseOut}
                />
              )
            }
          </Media>
        </TableCell>

        <ContactInfoModal
          {...this.props}
          open={this.state.contactInfoModalOpen}
          handleClose={this.handleContactInfoModalClose}
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
   * Avoid event bubbling... In this case - 
   *  ignore the handleContactListItemClick event when clicking the contact item action buttons
   * 
   * @param {Object} event
   */
  ignoreParentClickEvent(event) {
    if (event) event.stopPropagation();
    if (event.nativeEvent) event.nativeEvent.stopImmediatePropagation();
  }

  /**
   * @returns {String} - Avatar image URL
   */
  getRandomAvatar = () => {
    return `https://robohash.org/${this.props.id}.png`;
  }

  /**
   * Open contact info modal
   */
  handleContactListItemClick = () => {
    this.setState({ contactInfoModalOpen: true });
  }

  /**
   * Close contact info modal
   * 
   * @param {Object} event
   */
  handleContactInfoModalClose = (event) => {
    this.handleTableRowMouseOut();
    this.ignoreParentClickEvent(event);
    this.setState({ contactInfoModalOpen: false });
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
  starred: PropTypes.bool.isRequired,
  firstOfLetter: PropTypes.bool.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(ContactListItem);