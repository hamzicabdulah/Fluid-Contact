import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import ContactListItem from './ContactListItem';

export default function ContactListTable({ contacts, title }) {
  const contactsSorted = contacts.sort((lastContactName, contact) => {
    return (lastContactName > contact.firstName) ? 1 : -1;
  });

  return (
    <Table className="contacts_list">
      <TableHead>
        <TableRow>
          <TableCell className="contacts_title" colSpan={6}>{title} ({contacts.length})</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          contactsSorted.map((contact, index) =>
            <ContactListItem
              {...contact}
              firstOfLetter={
                !contactsSorted[index - 1] ||
                contact.firstName[0] !== contactsSorted[index - 1].firstName[0]
              }
              key={contact.id}
            />
          )
        }
      </TableBody>
    </Table>
  );
}

ContactListTable.propTypes = {
  contacts: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};