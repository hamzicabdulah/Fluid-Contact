import React, { Component } from 'react';
//import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import { Avatar } from '@material-ui/core';

class Navbar extends Component {
  render() {
    return (
      <AppBar position="static" className="navbar">
        <Toolbar className="toolbar">
          <IconButton className="navbar_menu_icon" color="inherit" aria-label="Open drawer">
            <MenuIcon />
          </IconButton>

          <Typography className="navbar_title" variant="h6" color="inherit" noWrap>
            Fluid Contacts
          </Typography>

          <Grid className="search" container>
            <Grid item xs={1}>
              <div className="search_icon">
                <Icon>search</Icon>
              </div>
            </Grid>
            <Grid item xs={11}>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: 'input_root',
                  input: 'input_input'
                }}
              />
            </Grid>
          </Grid>

          <Avatar
            alt="Profile Picture"
            src="https://goo.gl/DYPhHo"
            className="navbar_avatar"
          />
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;