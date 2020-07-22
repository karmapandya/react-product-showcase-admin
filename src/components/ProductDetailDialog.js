import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Container from '@material-ui/core/Container';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ReactImageMagnify from 'react-image-magnify';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Rating from '@material-ui/lab/Rating';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  cardRoot: {
    minWidth: 275
  },
  CardBullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  CardTitle: {
    fontSize: 14,
  },
  CardPos: {
    marginBottom: 12,
  },
  ImageStyle: {
    border: '1px solid black'
  },
  LikedProduct: {
    color: "red"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function ProductDetailDialog(props) {
  const labels = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
  };
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const {OpenDialog, handleDialogClose, SelectedCardData} = props;
  const bull = <span className={classes.CardBullet}>•</span>;
  const locations_array = () =>{
    let obj = SelectedCardData.locations
    var ret = [];
    for (var key in obj) {
         if (obj.hasOwnProperty(key) && obj[key] === true) {
            ret.push(key);
         }
      }
    let results = ret.join(',')
    if(ret.length ===0){
      results = "NA"
    }
    return results;
  }
  if(SelectedCardData){
  return (
    <div>
      <Dialog fullScreen open={OpenDialog} onClose={handleDialogClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleDialogClose} aria-label="close">
              <KeyboardBackspaceIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Product Details: {SelectedCardData.product_title}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleDialogClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
            <ReactImageMagnify {...{
                    smallImage: {
                        alt: 'Wristwatch by Ted Baker London',
                        isFluidWidth: true,
                        src: `${SelectedCardData.product_image}`
                    },
                    largeImage: {
                        src: `${SelectedCardData.product_image}`,
                        width: 1200,
                        height: 1800
                    }
                }} style={{zIndex: '1000'}} />
            </Grid>
            <Grid  item xs={12} sm={12} md={6} lg={6}>
              <Card className={classes.cardRoot} variant="outlined">
                <CardContent>
                <Typography variant="h5" component="h2">
                    {SelectedCardData.product_title}
                  </Typography>
                  <Typography className={classes.CardTitle} color="textSecondary" gutterBottom>
                    Availability: {SelectedCardData.in_stock ? `In Stock` : `Out of Stock`}
                  </Typography>
                  <Typography className={classes.CardTitle} color="textSecondary" gutterBottom>
                    Category: {SelectedCardData.category}
                  </Typography>
                  <Typography variant="h5" component="h2"  color="textSecondary">
                    ${SelectedCardData.price}{bull}(USD)
                  </Typography>
                  <Typography variant="body2" component="p">
                    {SelectedCardData.product_desc}
                  </Typography>
                  <Rating
                            name="hover-feedback"
                            value={SelectedCardData.rating}
                            precision={1}
                            readOnly
                          />
                          {SelectedCardData.rating !== null 
                          && 
                          <Typography variant="body2" color="textSecondary" component="p">
                            Rating: <b>{labels[SelectedCardData.rating]}</b>
                          </Typography>
                          }
                 
                 <IconButton aria-label="add to favorites">
                    <FavoriteIcon className={clsx(SelectedCardData.like && classes.LikedProduct)} />
                  </IconButton>
                 <Typography variant="body2" component="p">
                    <b>Available Locations:</b>
                  </Typography>
                  <List component="nav" aria-label="main mailbox folders">
                    <ListItem>
                    <ListItemText primary="Ahmedabad" />
                      <ListItemIcon>
                        {
                          SelectedCardData.locations.ahmedabad 
                          ?  <CheckCircleIcon style={{color:"green"}} />
                          : <CloseIcon style={{color:"red"}} />
                        }
                      </ListItemIcon>
                    </ListItem>
                    <ListItem>
                    <ListItemText primary="Mumbai" />
                      <ListItemIcon>
                        {
                          SelectedCardData.locations.mumbai 
                          ?  <CheckCircleIcon style={{color:"green"}} />
                          : <CloseIcon style={{color:"red"}} />
                        }
                      </ListItemIcon>
                    </ListItem>
                    <ListItem>
                    <ListItemText primary="Delhi" />
                      <ListItemIcon>
                        {
                          SelectedCardData.locations.delhi 
                          ?  <CheckCircleIcon style={{color:"green"}} />
                          : <CloseIcon style={{color:"red"}} />
                        }
                      </ListItemIcon>
                    </ListItem>
                    <ListItem>
                    <ListItemText primary="New York" />
                      <ListItemIcon>
                        {
                          SelectedCardData.locations.newyork 
                          ?  <CheckCircleIcon style={{color:"green"}} />
                          : <CloseIcon style={{color:"red"}} />
                        }
                      </ListItemIcon>
                    </ListItem>
                    <ListItem>
                    <ListItemText primary="California" />
                      <ListItemIcon>
                        {
                          SelectedCardData.locations.california 
                          ?  <CheckCircleIcon style={{color:"green"}} />
                          : <CloseIcon style={{color:"red"}} />
                        }
                      </ListItemIcon>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
        
      </Dialog>
    </div>
  );
  }
  else{
    return null;
  }
}