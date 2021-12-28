import { Paper, Typography } from '@mui/material';
import * as React from 'react';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Button } from '@mui/material';
import {makeStyles} from '@mui/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

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

export default function CarCard({id, productName, detail0, price, profileType}) {
    const classes = useStyles();
    let popWindow = (
        <>
          {/* <AcceptMentee id={id} productName={productName} detail0={detail0} price={price} profileType={profileType}/> */}
        </>
      )

    return(
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom component="h6" variant="body1" >
              {<DirectionsCarIcon />} <b>bmw m7 coupe</b>
              </Typography>
              <Typography variant="caption" component="h2">
                  Mark: marka<br/>
                  Model: <b>jakis</b><br/>
                  Type: {detail0}<br/>
              </Typography>
            </CardContent>
          </CardActionArea>
            <CardActions>
              <Button
                variant="contained"
                className={classes.button}
                endIcon={<AddShoppingCartIcon />}
                color="secondary">
                { new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(price) }
              </Button>
            </CardActions>
            {/* {target?popWindow : ""} */}
        </Card>
    );
}