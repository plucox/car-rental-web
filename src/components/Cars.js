import * as React from 'react';
import {Typography, Paper, Grid, Button, FormControl, InputLabel} from '@mui/material';
import CarCard from './CarCard';
import {makeStyles} from '@mui/styles';
import {useHistory} from 'react-router-dom';
import API from '../API';
import authHeader from '../services/auth-header';


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


export default function Cars() {
  const classes = useStyles();
  const history = useHistory();
  const [carList, setCarList] = React.useState(
    [{
      "_id": "60b604184b470713f2764bdc",
      "mark": "",
      "model": "",
      "type": "",
      "price": 0.0
    }]
  );

  React.useEffect(() => {
    API.get('car/all',{ headers: authHeader() }).then((result) => {
      console.log(result);
    }).catch(() => {
      console.log("There are no cars!");
    })
  },[]);


    return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
          List of cars
          </Typography>
          <React.Fragment>
              <React.Fragment>
                  <React.Fragment>
                      <br/>
                      {/* {advertismentList.map(({_id,price, description},index) => ( */}
                          <Grid container alignItems="center" spacing={3}>
                              <Grid item xs={4}>
                                  <CarCard/>
                              </Grid>
                              <Grid item xs={4}>
                                  <CarCard/>
                              </Grid>
                              <Grid item xs={4}>
                                  <CarCard/>
                              </Grid>
                          </Grid>
                      {/* ))} */}
                  </React.Fragment>
          </React.Fragment>
          </React.Fragment>
      </Paper>
    </main>
    );
}