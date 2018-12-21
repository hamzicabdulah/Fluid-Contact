import React, { Component } from 'react';
import ContactListItem from './ContactListItem';
import Table from '@material-ui/core/Table';
import { TableBody } from '@material-ui/core';

class App extends Component {
  render() {
    return (
      <Table>
        <TableBody>
          <ContactListItem></ContactListItem>
        </TableBody>
      </Table>
    );
  }
}

export default App;
