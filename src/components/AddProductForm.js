import React, {useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid'
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { createBrowserHistory } from "history";
import common from '../shared/common';

let history = new createBrowserHistory({forceRefresh: true});
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function FormDialog(props) {
  const {OpenFormVal, OpenFormFunc} = props;
  const [state, setState] = React.useState({
    ahmedabad: false,
    mumbai: false,
    delhi: false,
    newyork: false,
    california: false,
    current_category: 'none',
    current_product_rating: 1,
    product_id: "",
    product_name: "",
    product_image_url: "",
    product_desc: "",
    product_price: 0,
    product_in_stock: "true"
  });
  const handleClickOpen = () => {
   OpenFormFunc(true);
  };


  const handleChange = (event) => {
    console.log('changing val')
    setState({...state, [event.target.name]: event.target.value});
  };

  
  const handleClose = () => {
    OpenFormFunc(false);
  };
  const handleCheckedChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const classes = useStyles();
  const { ahmedabad, mumbai, 
    delhi,newyork,california,
    current_category,current_product_rating,
    product_id,
    product_desc,
    product_image_url,
    product_name,
    product_price,
    product_in_stock
   } = state;
  const error = [ahmedabad, mumbai, delhi,newyork,california].filter((v) => v).length < 1;
  const product_id_error_checker = !(/^\d+$/.test(product_id));
  const product_price_error_checker = !(/^\d+$/.test(product_price));
  const product_image_url_error_checker = !(/^(ftp|http|https):\/\/[^ "]+$/.test(product_image_url));
  const product_name_error_checker = !(product_name.length >= 3 && product_name.length <= 50);
  const product_desc_error_checker = !(product_desc.length >= 10 && product_desc.length <= 150);
  return (
    <div>
      <Dialog open={OpenFormVal} onClose={handleClose} maxWidth={"lg"}>
      <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
      <DialogContent>
      <DialogContentText>
            Please fill required info to add the product.
          </DialogContentText>
        <Grid container spacing={3}>
            <Grid item md={6} sm={6}>
            <TextField 
            autoFocus 
            name="product_id"
            error={product_id_error_checker}
            value={product_id} 
            helperText="id must be number."
            id="product_id" label="Product Id" 
            onChange={handleChange}
            fullWidth />
         
            </Grid>
            <Grid item md={6} sm={6}>
            <TextField
            name="product_name"
            value={product_name}
            error={product_name_error_checker}
            helperText="min 3 & max 50 char." 
            id="product_name" label="Product Name" 
            onChange={handleChange}
            fullWidth />
            </Grid>
           <Grid item md={12} sm={12}>
           <TextField  
            name="product_image_url"
            error={product_image_url_error_checker}
            value={product_image_url}
            helperText="Valid URLs only." 
            id="product_image_url" label="Product Image URL" 
            onChange={handleChange}
            fullWidth />
           </Grid>
           <Grid item md={12} sm={12}>
           <TextField
            multiline
            name="product_desc"
            helperText="min 10 & max 150 char."
            value={product_desc}
            onChange={handleChange}
            error={product_desc_error_checker}
            variant="filled"
            id="product_desc"
            label="Product Description"
            rows={4}
            fullWidth
          />
           </Grid>
           <Grid item md={3} sm={3}>
           <FormControl required error={error} component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Locations:</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={ahmedabad} onChange={handleCheckedChange} name="ahmedabad" />}
                  label="Ahmedabad"
                />
                <FormControlLabel
                  control={<Checkbox checked={delhi} onChange={handleCheckedChange} name="delhi" />}
                  label="Delhi"
                />
                <FormControlLabel
                  control={<Checkbox checked={mumbai} onChange={handleCheckedChange} name="mumbai" />}
                  label="Mumbai"
                />
                <FormControlLabel
                  control={<Checkbox checked={newyork} onChange={handleCheckedChange} name="newyork" />}
                  label="New York"
                />
                <FormControlLabel
                  control={<Checkbox checked={california} onChange={handleCheckedChange} name="california" />}
                  label="California"
                />
              </FormGroup>
              <FormHelperText>Pick at least 1 location.</FormHelperText>
            </FormControl>
           </Grid>
           <Grid item md={3} sm={3}>
           <FormControl className={classes.formControl} id="current_category">
                  <InputLabel id="current_category">Category</InputLabel>
                  <Select
                    labelId="current_category"
                    id="current_category"
                    name="current_category"
                    value={current_category}
                    onChange={handleChange}
                  >
                    <MenuItem value="none">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"watch"}>Watch</MenuItem>
                    <MenuItem value={"lamp"}>Lamp</MenuItem>
                    <MenuItem value={"sunglasses"}>Sunglasses</MenuItem>
                  </Select>
                  <FormHelperText>(Optional) Select Category</FormHelperText>
                </FormControl>
           </Grid>
           <Grid item md={3} sm={3}>
           <FormControl className={classes.formControl} id="current_product_rating">
                  <InputLabel id="current_product_rating">Rating</InputLabel>
                  <Select
                    labelId="current_product_rating"
                    id="current_product_rating"
                    name="current_product_rating"
                    value={current_product_rating}
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                  <FormHelperText>Select Rating(default is 1)</FormHelperText>
                </FormControl>
           </Grid>
           <Grid item md={3} sm={3}>
           <FormControl className={classes.formControl} id="current_category">
            <TextField 
            id="standard-basic" 
            label="Price"
            name="product_price"
            value={product_price}
            error={product_price_error_checker}
            onChange={handleChange}
            helperText="Only numbers allowed. Round to nearest." 
            fullWidth  />
            <FormHelperText>$(USD)</FormHelperText>
           </FormControl>
           </Grid>
           <Grid item md={3} sm={3}>
           <FormControl className={classes.formControl} id="current_category">
            <FormLabel component="legend">Product</FormLabel>
            <RadioGroup aria-label="gender" name="product_in_stock" value={product_in_stock} onChange={handleChange}>
              <FormControlLabel value={"true"} control={<Radio />} label="In Stock" />
              <FormControlLabel value={"false"} control={<Radio />} label="Out of Stock" />
            </RadioGroup>
          </FormControl>
           </Grid>
        </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={
            ()=>{

              let current_object = common.getData();
              if(!current_object){
                current_object = {
                  products: []
                }
              }
              let temp_form_data = {
                  product_id: product_id, 
                  product_title: product_name ,
                  product_image: product_image_url,
                  product_desc: product_desc,
                  like: false,
                  item_removed: false,
                  in_stock: product_in_stock,
                  locations: {
                    ahmedabad: ahmedabad,
                    mumbai: mumbai,
                    delhi: delhi,
                    newyork: newyork,
                    california: california,
                  },
                  category: current_category,
                  price: product_price,
                  rating: current_product_rating
                
              }
              if(error 
                || product_desc_error_checker 
                || product_id_error_checker
                || product_image_url_error_checker
                || product_name_error_checker
                || product_price_error_checker
                ){
                  alert("Please check input and try again!")
                }
                else{

                  current_object.products.push(temp_form_data)
                  let result = common.setData(current_object)
                  console.log(state)
                  history.push('/')
                }

            }} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}