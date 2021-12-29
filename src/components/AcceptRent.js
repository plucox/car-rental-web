import React from 'react'
import API from '../API';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AlertTitle, Alert } from '@mui/material';
import { useHistory } from "react-router-dom";
import authService from '../services/auth.service';
import authHeader from '../services/auth-header';



function AcceptRent({id, mark, model, type, price, engine, fuelType, horsePower, color, seats, yearOfProduction, dateFrom, dateTo}) {
    const [open, setOpen] = React.useState(true);
    let history = useHistory();
    const handleClose = () => {
      setOpen(false);
      history.push("/availablecars");
    };
    
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    const sendValue = () => {
        API.patch('user/attach-rent?userId='+userId+'&carId='+id, {
            "dateFrom": dateFrom,
            "dateTo": dateTo
        }, {
            headers: authHeader()
        })
        .then(function(result){
            console.log(result);
            history.push("/");
        })
    };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title">
        <DialogTitle id="alert-dialog-title">
          {"Summary of rent the car"}
        </DialogTitle>
        <DialogContent>
        <Alert severity="success">
            <AlertTitle><strong>{mark} {model} {type}</strong></AlertTitle>
            Engine: <b>{engine}</b><br/>
            Fuel Type: <b>{fuelType}</b><br/>
            Horse Power: <b>{horsePower}</b><br/>
            Color: <b>{color}</b><br/>
            Seats: <b>{seats}</b><br/>
            Year of production: <b>{yearOfProduction}</b><br/>
            Rent time: <b>{dateFrom} to {dateTo}</b> <br/>
            The price is <strong>{price}</strong><br/>
            <br/>
            <Button
            variant="contained"
            color="primary"
            onClick={sendValue}
            >
            Accept
            </Button>
        </Alert>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AcceptRent