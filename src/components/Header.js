import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import AuthService from "../services/auth.service";
import { Router, NavLink, useHistory } from 'react-router-dom';


const lightColor = 'rgba(255, 255, 255, 0.7)';


function ButtonLogInLogout () {
  var user = AuthService.getCurrentUser();
  const history = useHistory();

  const signOutUser = () => {
    AuthService.logout();
    history.push("/");
    window.location.reload();
  };

  return(
    user ? 
    <React.Fragment>
      {user.email}&nbsp;&nbsp;
    <Button variant="contained" onClick={signOutUser} >Logout</Button>
    </React.Fragment>
    :
    <React.Fragment>
      <NavLink to="/login">
        <Button variant="contained">Log In</Button>
      </NavLink>
      <NavLink to="/register">
        <Button variant="contained">Sign Up</Button>
      </NavLink>
    </React.Fragment>
  )
}

function Header(props) {
  const { onDrawerToggle } = props;

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />

              <ButtonLogInLogout />

          </Grid>
        </Toolbar>
      </AppBar>
      
      <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
        <Tabs value={0} textColor="inherit">
          <Tab label="Users" />
          <Tab label="Sign-in method" />
          <Tab label="Templates" />
          <Tab label="Usage" />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;