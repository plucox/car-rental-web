import * as React from 'react';
import {Typography, Paper, Grid, Button, FormControl, InputLabel, TextField, Stack} from '@mui/material';
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


export default function AvailableCars() {
  const classes = useStyles();
  const history = useHistory();
  const [dateFrom, setDateFrom] = React.useState("2022-01-01");
  const [dateTo, setDateTo] = React.useState("2022-01-02");
  const [carList, setCarList] = React.useState(
    [{}]
  );

  const [renderCarList, setRenderCarList]=React.useState(false);

  const onChangeDateFrom = (e) => {
      setDateFrom(e.target.value);
  };

  const onChangeDateTo = (e) => {
      setDateTo(e.target.value);
  }

  React.useEffect(() => {

    if(dateTo>dateFrom){
    API.get('car/all-available?dateFrom='+dateFrom+'&dateTo='+dateTo,{ headers: authHeader() }).then((result) => {
      setCarList(result.data);
      setRenderCarList(true)
    }).catch(() => {
      console.log("There are no cars!");
    })
  } else {
    setCarList([{}]);
    setRenderCarList(false);
  }

  },[dateFrom, dateTo]);


    return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
          List of cars
          </Typography>
            <TextField
                id="dateFrom"
                label="Date From"
                type="date"
                defaultValue={dateFrom}
                onChange={onChangeDateFrom}
                sx={{ width: 220 }}
                InputLabelProps={{
                shrink: true,
                }}
            />&nbsp;
            <TextField
                id="dateTo"
                label="Date To"
                type="date"
                defaultValue={dateTo}
                onChange={onChangeDateTo}
                sx={{ width: 220 }}
                InputLabelProps={{
                shrink: true,
                }}
            />
          <React.Fragment>
              <React.Fragment>
                  <React.Fragment>
                      <br/>
                      <br/>
                        <Grid container alignItems="center" spacing={3}>
                          {renderCarList ? carList.map(({_id,mark, model, type, price}) => (
                            <Grid item xs={4} key={_id}>
                                  <CarCard 
                                  id={_id}
                                  mark={mark}
                                  model={model}
                                  price={price}
                                  type={type}
                                  available={true}
                                  dateFrom={dateFrom}
                                  dateTo={dateTo}
                                  />
                              </Grid>
                          )): 
                          <Typography component="h1" variant="h5" align="right">
                          &nbsp;&nbsp;&nbsp;&nbsp;No cars to render, Enter correct date.
                          </Typography>
                          }
                        </Grid>
                  </React.Fragment>
          </React.Fragment>
          </React.Fragment>
      </Paper>
    </main>
    );
}