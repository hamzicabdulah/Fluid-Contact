import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

class ContactListItem extends Component {
  render() {
    return (
      <TableRow>
        <TableCell
          align="right"
          padding="none"
          className="contact_avatar"
        >
          <Avatar alt="Full Name" src="https://robohash.org/full_name.png" />
        </TableCell>

        <TableCell align="left" className="contact_full_name">
          Full Name
        </TableCell>

        <TableCell className="contact_email">
          email@gmail.com
        </TableCell>

        <TableCell className="contact_phone_number">
          +230948329498234
        </TableCell>

        <TableCell align="right" className="contact_action_buttons">
          <IconButton aria-label="Favorite" className="contact_favorite_button">
            <Icon>star_border</Icon>
          </IconButton>

          <IconButton aria-label="Edit" className="contact_edit_button">
            <Icon>create</Icon>
          </IconButton>

          <IconButton aria-label="Options" className="contact_options_button">
            <Icon>more_vert</Icon>
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
}

export default ContactListItem;