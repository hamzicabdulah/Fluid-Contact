import React, { Component } from 'react';
import ContactListItem from './ContactListItem';
import Table from '@material-ui/core/Table';
import { TableBody } from '@material-ui/core';

class App extends Component {
  render() {
    return (
      <Table>
        <TableBody>
          <ContactListItem
            id={1}
            picture_url="https=//goo.gl/i8H1GJ"
            name="Abdulah Hamzic"
            email="abdulahhamzic@gmail.com"
            phone_number="+38977605851"
            favorite={false}
          >
          </ContactListItem>
        </TableBody>
      </Table >
    );
  }
}

export default App;
