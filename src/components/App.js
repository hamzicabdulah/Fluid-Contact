import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import ContactList from './ContactList';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

class App extends Component {
  render() {
    return (
      <div>
        <Grid container>
          <Navbar />
          <Grid className="sidebar_container"><Sidebar /></Grid>
          <Grid className="contact_list_container"><ContactList /></Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
