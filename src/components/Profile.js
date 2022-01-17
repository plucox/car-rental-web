import * as React from 'react';
import {Typography, Paper, TextField, Box, Stack, Button} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {useHistory} from 'react-router-dom';
import API from '../API';
import authHeader from '../services/auth-header';
import AuthService from "../services/auth.service";


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 800,
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.up(1200 + theme.spacing(2) * 2)]: {
      width: 1200,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function Profile() {
  const classes = useStyles();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  const [details, setDetails]=React.useState([{}]);


  React.useEffect(() => {
    API.get('user/getByID?userId='+userId,{ headers: authHeader() }).then(result => {
      setDetails(result.data);
    }).catch(() => {
      console.log("Cannot find details for given id user!");
    })
    },[]);


  const deleteAccount = (e) =>{
      e.preventDefault();
      API.delete('user/delete-user?userId='+userId,{ headers: authHeader() }).then((result) => {
        AuthService.logout();
        history.push("/");
        window.location.reload();
      }).catch(() => {
        console.log("There are no user with given id!");
      })
      
  };

    return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
          <Typography component="h1" variant="h4" align="center">
          My Profile
          </Typography>
          <Typography  variant="h5" align="left">
          Username: <strong> {details.username}</strong>
          </Typography>
          <Typography  variant="h5" align="left">
          Email adress: <strong>{details.email}</strong>
          </Typography>
          <Typography  variant="h5" align="left">
          Role: <strong>{user.roles=='ROLE_ADMIN' ? "Admin" : "User"}</strong>
          </Typography>
          <br/>
            <Button variant="contained" onClick={deleteAccount}>Delete account</Button>
        </Paper>
      </main>
    );
}