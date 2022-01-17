import * as React from 'react';
import {Typography, Paper, Grid, Button, FormControl, InputLabel} from '@mui/material';
import CarCard from './CarCard';
import {makeStyles} from '@mui/styles';
import {useHistory} from 'react-router-dom';
import API from '../API';
import authHeader from '../services/auth-header';
import AuthService from '../services/auth.service';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 1200,
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


export default function AllCars() {
  const classes = useStyles();
  const history = useHistory();
  const [carList, setCarList] = React.useState(
    [{}]
  );
  var user = AuthService.getCurrentUser();
  var role = user.roles;

  React.useEffect(() => {
    API.get('car/all',{ headers: authHeader() }).then((result) => {
      // console.log(result.data);
      setCarList(result.data)
    }).catch(() => {
      console.log("There are no cars!");
    })
  },[]);

    return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
          List of cars to delete
          </Typography>
          <React.Fragment>
              <React.Fragment>
                  <React.Fragment>
                      <br/>
                        <Grid container alignItems="center" spacing={3}>
                          {carList.map(({_id,mark, model, type, price}) => (
                            <Grid item xs={4} key={_id}>
                                  <CarCard 
                                  id={_id}
                                  mark={mark}
                                  model={model}
                                  price={price}
                                  type={type}
                                  role={role}
                                  />
                              </Grid>
                          ))}
                        </Grid>
                  </React.Fragment>
          </React.Fragment>
          </React.Fragment>
      </Paper>
    </main>
    );
}