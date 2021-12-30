import * as React from 'react';
import {Typography, Paper, TextField, Box, Stack, Button} from '@mui/material';
import CarCard from './CarCard';
import {makeStyles} from '@mui/styles';
import {useHistory} from 'react-router-dom';
import API from '../API';
import authHeader from '../services/auth-header';
import axios from 'axios';

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


export default function AddCar() {
  const classes = useStyles();
  const history = useHistory();
  const [carId, setCarId] = React.useState("");
  const [values, setValues] = React.useState({
      "mark": "",
      "model": "",
      "type": "",
      "price": "",
      "engine": "",
      "fuelType": "",
      "horsePower": "",
      "yearOfProduction": "",
      "color": "",
      "seats": "",
  });

  const handleSetInputs = (e) => {
      setValues({...values, [e.target.id]: e.target.value});
  };

  const handleAddCar = (e) =>{
      e.preventDefault();
      //Adding Car
      API.post('car/add', 
      {
          "mark": values.mark,
          "model": values.model,
          "type": values.type,
          "price": values.price
      }, 
      {
          headers: authHeader()
      })
      .then((result) => {
        //Adding car details
        API.post('car/add-details?idCar='+result.data._id, 
        {
            "engine": values.engine,
            "fuelType": values.fuelType,
            "horsePower": values.horsePower,
            "yearOfProduction": values.yearOfProduction,
            "color": values.color,
            "seats": values.seats
        }, 
        {
            headers: authHeader()
        })
        .then((result) => {
            console.log(result.data);
            history.push("/");
        })
        .catch((err) => {
            console.log(err);
        })
        })
      .catch((err) => {
          console.log(err);
      })
      
    //   //Adding car details
    //   API.post('car/add-details?idCar='+carId, 
    //   {
    //     "engine": values.engine,
    //     "fuelType": values.fuelType,
    //     "horsePower": values.horsePower,
    //     "yearOfProduction": values.yearOfProduction,
    //     "color": values.color,
    //     "seats": values.seats
    //   }, 
    //   {
    //       headers: authHeader()
    //   })
    //   .then((result) => {
    //     console.log(result.data);
    //   })
    //   .catch((err) => {
    //       console.log(err);
    //   })
  };

    return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
          Add new car
          </Typography>
          <Typography component="h1" variant="h6" align="left">
          Enter Car Info:
          </Typography>
          <Box component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off">

            <TextField required id="mark" value={values.mark} label="Mark" onChange={handleSetInputs} /> 
            <TextField required id="model" label="Model" defaultValue="" onChange={handleSetInputs} />
            <TextField required id="type" label="Type" defaultValue="" onChange={handleSetInputs} />
            <TextField required id="price" label="Price" type="number" defaultValue="" onChange={handleSetInputs} />

            <Typography component="h1" variant="h6" align="left">
            Enter Car Details:
            </Typography>
            <TextField required id="engine" label="Engine" defaultValue="" onChange={handleSetInputs} />
            <TextField required id="fuelType" label="Fuel Type" defaultValue="" onChange={handleSetInputs} />
            <TextField required id="horsePower" label="Horse Power" type="number" defaultValue="" onChange={handleSetInputs} />
            <TextField required id="yearOfProduction" label="Year Of Production" type="number" defaultValue="" onChange={handleSetInputs} />
            <TextField required id="color" label="Color" defaultValue="" onChange={handleSetInputs} />
            <TextField required id="seats" label="Seats" type="number" defaultValue="" onChange={handleSetInputs} />
            </Box>
            <Button variant="contained" onClick={handleAddCar}>Add car</Button>
        </Paper>
      </main>
    );
}