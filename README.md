This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start or npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### SetDummyData from common.js file.

For easy use, you can remove comment from line 148 of Dashboard.js file.

### Filter/search functions

Search bar on top searches for product name & description.


### data model is stored in local storage

key for local storage is "TEMP_DATA_STORE"

object of product is 
{
        product_id: 6, 
        product_title: "sample sunglasses2323" ,
        product_image: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-product-3_large.png?format=jpg&quality=90&v=1530129341",
        product_desc: "Sample product2 of another watch. this is sample product watch no.2 .",
        like: false,
        item_removed: false,
        in_stock: false,
        category: 'sunglasses',
        price: 24,
        rating: 4,
        locations: {
          ahmedabad: true,
          mumbai: true,
          delhi: true,
          newyork: false,
          california: false,
        }
      }

### SetTimeout is used for loading spinner animation.(Fake load)

### Hard delete will delete from localStorage.


### Things To Improve. Seperate code from dashboard to seperate componenets. Split as necessary.