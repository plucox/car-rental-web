import { Paper, Typography } from '@mui/material';
import * as React from 'react';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Button } from '@mui/material';
import {makeStyles} from '@mui/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import API from '../API';
import authHeader from '../services/auth-header';
import AcceptRent from './AcceptRent';
import EditIcon from '@mui/icons-material/Edit';
import AddCar from './AddCar';
import DeleteCar from './DeleteCar';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 1200,
      boxShadow: theme.shadows[1],
      '&:hover': {
        boxShadow: theme.shadows[6],
      },
    },
    button: {
      marginLeft: 'auto !important',
    },
    cardContent: {
      minHeight: 55,
    }
}));

export default function CarCard({id, mark, model, type, price, available, dateFrom, dateTo, role}) {
    const classes = useStyles();
    const [details, setDetails] = React.useState([]);
    const [acceptRentWindow, setAcceptRentWindow] = React.useState(false);
    var differenceInTime = new Date(dateTo) - new Date (dateFrom);
    var differenceInDays = differenceInTime / (1000 * 3600 * 24);
    if(differenceInDays > 0)
      price=differenceInDays*price;
    
    const [deleteCar, setDeleteCar] = React.useState(false);

    let deleteCarView = (
      <>
        <DeleteCar 
        id={id} 
        mark={mark} 
        model={model} 
        type={type} 
        price={price} 
        engine={details.engine}
        fuelType={details.fuelType}
        horsePower={details.horsePower}
        color={details.color}
        seats={details.seats}
        yearOfProduction={details.yearOfProduction}
        dateFrom={dateFrom}
        dateTo={dateTo}
        />
      </>
    )

    let popWindow = (
      <>
        <AcceptRent 
        id={id} 
        mark={mark} 
        model={model} 
        type={type} 
        price={price} 
        engine={details.engine}
        fuelType={details.fuelType}
        horsePower={details.horsePower}
        color={details.color}
        seats={details.seats}
        yearOfProduction={details.yearOfProduction}
        dateFrom={dateFrom}
        dateTo={dateTo}
        />
      </>
    )

    const acceptRentHandler = () => {
      if(available === true)
        setAcceptRentWindow(true);
    }

    const deleteCarHandler = () =>{
      setDeleteCar(true);
    }

    React.useEffect(() => {
      API.get('car/details?idCar='+id,{ headers: authHeader() }).then(result => {
        // console.log(result.data);
        setDetails(result.data);
      }).catch(() => {
        console.log("Cannot find details for given id car!");
      })
      },[]);
    

    return(
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom component="h6" variant="body1" >
              {<DirectionsCarIcon />} <b>{mark} {model} {type}</b>
              </Typography>
              <Typography variant="caption" component="h2">
                  Engine: <b>{details.engine}</b><br/>
                  Fuel Type: <b>{details.fuelType}</b><br/>
                  Horse Power: <b>{details.horsePower}</b><br/>
                  Color: <b>{details.color}</b><br/>
                  Seats: <b>{details.seats}</b><br/>
                  Year of production: <b>{details.yearOfProduction}</b><br/>
              </Typography>
            </CardContent>
          </CardActionArea>
            <CardActions>
              <Button
                variant="contained"
                className={classes.button}
                endIcon={role=='ROLE_ADMIN' ? <EditIcon /> : <AddShoppingCartIcon />}
                color="secondary"
                onClick={role=='ROLE_ADMIN' ? deleteCarHandler : acceptRentHandler}
              >
                { new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(price) }
              </Button>
            </CardActions>
            {acceptRentWindow ? popWindow : ""}
            {deleteCar ? deleteCarView : ""}
        </Card>
    );
}