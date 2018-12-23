import React, { Component } from 'react';
import ContactList from './ContactList';
import Navbar from './Navbar';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <ContactList></ContactList>
      </div>
    );
  }
}

export default App;
