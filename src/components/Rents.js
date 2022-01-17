import * as React from 'react';
import {Typography, Paper, Grid, Button, FormControl, InputLabel} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {useHistory} from 'react-router-dom';
import API from '../API';
import authHeader from '../services/auth-header';
import axios from 'axios';
import Rent from './Rent';

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


export default function Rents() {
  const classes = useStyles();
  const history = useHistory();
  const [rentList, setRentList] = React.useState(
    [{
        "_id": "61ccd6a541665911fc68452c",
        "car": {
            "_id": "617ac423eb06b513a79950f5",
            "mark": "audi",
            "model": "a4 b8",
            "type": "sedan",
            "price": 500,
            "carDetails": null
        },
        "dateFrom": "2021-12-01",
        "dateTo": "2021-12-02"
    }]);
    
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

  React.useEffect(() => {
    API.get('user/getAllUserRents?userId='+userId,{ headers: authHeader() }).then((result) => {
      setRentList(result.data)
    }).catch(() => {
      console.log("There are no cars!");
    })
  },[]);

    return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
          List of rents
          </Typography>
          <React.Fragment>
              <React.Fragment>
                  <React.Fragment>
                      <br/>
                        <Grid container alignItems="center" spacing={3}>
                          {rentList.map(({_id,dateFrom, dateTo, car}) => (
                            <Grid item xs={12} key={_id}>
                                <Rent
                                idRent={_id}
                                dateFrom={dateFrom}
                                dateTo={dateTo}
                                mark={car.mark}
                                model={car.model}
                                type={car.type}
                                idCar={car._id}
                                price={car.price}
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