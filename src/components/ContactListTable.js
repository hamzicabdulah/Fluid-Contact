import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import ContactListItem from './ContactListItem';

export default function ContactListTable({ contacts, title }) {
  return (
    <Table className="contacts_list">
      <TableHead>
        <TableRow>
          <TableCell className="contacts_title" colSpan={6}>{title} ({contacts.length})</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          contacts.sort((lastContactName, contact) => {
            return (lastContactName > contact.name) ? 1 : -1;
          }).map(contact => <ContactListItem {...contact} key={contact.id} />)
        }
      </TableBody>
    </Table>
  );
}

ContactListTable.propTypes = {
  contacts: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};