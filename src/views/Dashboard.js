import React, { useEffect,useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Fab from '@material-ui/core/Fab';
import Container from '@material-ui/core/Container';
import Slider from '@material-ui/core/Slider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import DialogTitle from '@material-ui/core/DialogTitle'
import Paper from '@material-ui/core/Paper';
import Header from '../components/Header';
import Copyright from '../components/Copyright';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Loader from 'react-loader-spinner'
import commonFunc from '../shared/common';
import AddProductForm from '../components/AddProductForm';
import ProductDetailsDialog from '../components/ProductDetailDialog';
import { Divider, Button } from '@material-ui/core';

import { createBrowserHistory } from "history";
import common from '../shared/common';



let history = new createBrowserHistory({forceRefresh: true});
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  CardRoot: {
    maxWidth: 345,
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  LikedProduct: {
    color: "red"
  }
}));

export default function Dashboard(props) {
  const labels = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
  };
  const [data, setData] = useState(null);
  const [dataFilter, setDataFilter] = useState({
    locations: {
      ahmedabad: true,
      mumbai: true,
      delhi: true,
      california: true,
      mumbai: true,
      newyork: true,
    },
    search_term: '',
    in_stock: "true",
    price_range: [0,2000]
  })
  const [loading, setLoadingVal]= useState(true);
  const [openForm,setOpenForm] = React.useState(false);
  const [openProductDialog, setOpenProductDialog] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [Alertopen, setAlertOpen] = React.useState(false);
  const [AlertData, setAlertData] = React.useState({
    text: 'Favorite?',
    type: 'like'
  });
  // setCurrentIndex
  const classes = useStyles();

  useEffect(()=>{
    setTimeout( () =>{
      /**
       * 
       * Use below line to set dummy data.
       * 
       */

      // let result = commonFunc.setDummyData(); // reset to default dummy data

      
      let result2 = commonFunc.getData()
      setData(result2);
      setLoadingVal(false)
      console.log(result2)
    },1500)
    

  },[])

  const locationFilterValueCompare = (dataObject, filterObject) => {
    var keysA = Object.keys(dataObject);
    return keysA.some( (t_l) => {
      if(dataObject[t_l]){
        return dataObject[t_l] === filterObject[t_l];
      }
      else{
        return false;
      }
    })
}
const searchTerm = (search_term_key,DataObject) =>{

  let temp_product_tile = DataObject.product_title.toLowerCase();
  let temp_product_desc = DataObject.product_desc.toLowerCase();
  let textIncludesInTitle = temp_product_tile.includes(search_term_key.toLowerCase());
  let textIncludesInDescription = temp_product_desc.includes(search_term_key.toLowerCase());

  if(textIncludesInTitle || textIncludesInDescription){
    return true;
  }
  else{
    return false;
  }
}
  const handleAlertClickConfirm = () => {
      console.log(currentIndex)
      let current_object = common.getData();
      let temp_object = current_object.products[currentIndex];
      if(AlertData.type === 'delete'){
        temp_object.item_removed = true
      }
      else{
        temp_object.like = !temp_object.like
      }
      current_object.products[currentIndex] = temp_object
      common.setData(current_object)
      history.push("/")
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
    
  };

  if(loading){
    return (
          <div style={{textAlign: "center"}}> 
            <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100} //3 secs
          /></div>
          )
  }
  else{
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header SearchVal={dataFilter.search_term} ChangeSearchTerm={
          (e)=>{
            setDataFilter({
              ...dataFilter,
              search_term: e.target.value
            })
        }} />
        
      <ProductDetailsDialog OpenDialog={openProductDialog} handleDialogClose={()=>{
        setOpenProductDialog(false)
      }} SelectedCardData={data ? data.products[currentIndex] : null} />
        <Dialog
        open={Alertopen}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`${AlertData.text}`}</DialogTitle>
        <DialogActions>
          <Button onClick={handleAlertClickConfirm} color="primary" autoFocus>
            Yes.
          </Button>
          <Button onClick={handleAlertClose} color="primary">
            No.
          </Button>
        </DialogActions>
      </Dialog>
      <AddProductForm OpenFormVal={openForm} OpenFormFunc={setOpenForm} />
        <Fab color="primary" variant="extended" style={{margin: 0,
          top: 'auto',
          right: 20,
          bottom: 20,
          left: 'auto',
          position: 'fixed',}}
          onClick={()=>{setOpenForm(true)}}>
              <AddIcon className={classes.extendedIcon} />
              Add Product
            </Fab>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            {/**
            



            Filter Code.






             */}
          <Grid container spacing={3}>
            <Grid items xs={6}>
            <FormLabel component="legend">Locations:</FormLabel>
             
             <FormControlLabel
                 control={<Checkbox 
                  checked={dataFilter.locations.ahmedabad}
                  onChange={(event)=>{
                    setDataFilter({
                      ...dataFilter, locations:{
                        ...dataFilter.locations,
                        ahmedabad: event.target.checked,
                      }
                    })
                  }}
                    name="ahmedabad" />}
                 label="Ahmedabad"
               />
             <FormControlLabel
                 control={<Checkbox checked={dataFilter.locations.mumbai}
                 onChange={(event)=>{
                  setDataFilter({
                    ...dataFilter, locations:{
                      ...dataFilter.locations,
                          mumbai: event.target.checked,
                    }
                  })
                }}
                name="mumbai" />}
                 label="Mumbai"
               />
               <FormControlLabel
                 control={<Checkbox checked={dataFilter.locations.newyork}
                 onChange={(event)=>{
                  setDataFilter({
                    ...dataFilter, locations:{
                      ...dataFilter.locations,
                      newyork: event.target.checked,
                    }
                  })
                }}
                name="newyork" />}
                 label="New York"
               />
               <FormControlLabel
                 control={<Checkbox checked={dataFilter.locations.delhi}
                 onChange={(event)=>{
                  setDataFilter({
                    ...dataFilter, locations:{
                      ...dataFilter.locations,
                      delhi: event.target.checked,
                    }
                  })
                }}
                name="delhi" />}
                 label="Delhi"
               />
               <FormControlLabel
                 control={<Checkbox checked={dataFilter.locations.california}
                 onChange={(event)=>{
                  setDataFilter({
                    ...dataFilter, locations:{
                      ...dataFilter.locations,
                      california: event.target.checked,
                    }
                  })
                }}
                name="california" />}
                 label="California"
               />
               
            </Grid>
            <Grid item xs={3}>
            <RadioGroup aria-label="stock" name="product_in_stock" value={dataFilter.in_stock}
            onChange={(e)=>{
              setDataFilter({
                ...dataFilter, in_stock: e.target.value
              })
            }}>
             <FormControlLabel value={"true"} control={<Radio />} label="In Stock" />
             <FormControlLabel value={"false"} control={<Radio />} label="Out of Stock" />
             <FormControlLabel value={"both"} control={<Radio />} label="Both" />
           </RadioGroup>
            </Grid>
            <Grid item xs={3}>
              
            </Grid>
            <Grid item xs={6}>
            <Typography id="range-slider" gutterBottom>
                  Price Range
                </Typography>
                <Slider
                  value={dataFilter.price_range}
                  max={2000}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  onChange={(e, newVal)=>{
                    setDataFilter({
                      ...dataFilter, price_range: newVal
                    })
                  }}
                />
            </Grid>
            <Grid item xs={3}>
              <Button color="secondary" 
              variant="contained"
              onClick={()=>{
                setDataFilter({
                    locations: {
                      ahmedabad: true,
                      mumbai: true,
                      delhi: true,
                      california: true,
                      mumbai: true,
                      newyork: true
                    },
                    in_stock: "true",
                    price_range: [0,2000],
                    search_term: ''
                })
              }}>Reset</Button>
            </Grid>
          </Grid>
            {/**
            



            End of Filter Code.





            
             */}


             {/**
            



            Product Data Showcase.





            
             */}
            <Grid container spacing={3} alignItems="stretch">
             
             {data ? 
              data.products.some(item => item.item_removed === false) ? //check if any removed data exists.
              data.products.map((elem,index) =>{ //if it does. loop through else show empty message.
             if(!elem.item_removed)
             {

                  if((elem.in_stock).toString() == dataFilter.in_stock || dataFilter.in_stock == "both")
                  {
                    if(elem.price >= dataFilter.price_range[0] && elem.price <= dataFilter.price_range[1])
                    {
                    if(locationFilterValueCompare(elem.locations, dataFilter.locations))
                      {
                        console.log(searchTerm(dataFilter.search_term,elem))
                        console.log(dataFilter.search_term)
                        if(dataFilter.search_term ==="" || searchTerm(dataFilter.search_term,elem))
                        {
                return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index} style={{display: 'flex'}}>
                <Card className={classes.CardRoot} style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                        <CardHeader
                          action={
                            <IconButton aria-label="settings">
                              <Button color="primary" onClick={()=>{
                                setCurrentIndex(index)
                                setOpenProductDialog(true)
                                }}>Details</Button>
                            </IconButton>
                          }
                          title={`${elem.product_title}`}
                          subheader={`$ ${elem.price} (USD)`}
                        />
                        <CardMedia
                          className={classes.media}
                          image={`${elem.product_image}`}
                          title={`image-${elem.product_id}`}
                        />
                        <CardContent>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {elem.product_desc}
                          </Typography>
                          <Rating
                            name="hover-feedback"
                            value={elem.rating}
                            precision={1}
                            readOnly
                          />
                          {elem.rating !== null 
                          && 
                          <Typography variant="body2" color="textSecondary" component="p">
                            Rating: <b>{labels[elem.rating]}</b>
                          </Typography>
                          }
                          <Typography variant="body2" color="textSecondary" component="p">
                            Availibity: <b>{elem.in_stock ? `In Stock` : 'Out of Stock'}</b>
                          </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                          <IconButton aria-label="add to favorites" onClick={
                            ()=>{
                              if(elem.like){

                                setAlertData({
                                  text: 'Remove from favorite?',
                                  type: 'like'
                                })
                              }
                              else{
                                setAlertData({
                                  text: 'Favorite?',
                                  type: 'like'
                                })
                              }
                              setAlertOpen(true)
                              setCurrentIndex(index);
                            }
                          }>
                            <FavoriteIcon className={clsx(elem.like && classes.LikedProduct)} />
                          </IconButton>
                          <IconButton aria-label="share" onClick={
                            ()=>{

                            setAlertData({
                                  text: 'Delete?',
                                  type: 'delete'
                                })
                              
                              setAlertOpen(true)
                              setCurrentIndex(index);
                            }
                          }>
                            <DeleteIcon />
                          </IconButton>
                        </CardActions>
                      </Card>
              </Grid>
                )
                        }
                      }
                    }
                  }
              }
            })
            :
            <Grid container spacing={3} style={{
              minHeight: "80vh"}}>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary" align="center">Data not found.</Typography>
                <Typography variant="body2" color="textSecondary" align="center">Add products to continue.</Typography>
              </Grid>
            </Grid>
            :
            <Grid container spacing={3} style={{
              minHeight: "80vh"}}>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary" align="center">Data not found.</Typography>
                <Typography variant="body2" color="textSecondary" align="center">Add products to continue.</Typography>
              </Grid>
            </Grid>
            }
            </Grid>
             {/**
            



            End of Product Data Showcase Code.





            
             */}
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    );
  }
}