// commons functions to store retrieve data from localstorage.
// /**
const setDummyData = () => {
  const dummy_data = {
    products: [
      {
        product_id: 1,
        product_title: "sample watch" ,
        product_image: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-product-5_large.png?format=jpg&quality=90&v=1530129458",
        product_desc: "Sample product watch. this is sample product watch. aksdjfnaskldj fnasdkjlfna jskldfn alkjsdfn alkjsdfn ljkasdnflajks dfnlakjsdfnlajks dnflajksfdn",
        like: true,
        item_removed: true,
        in_stock: false,
        category: 'watch',
        price: 99,
        rating: 4,
        locations: {
          ahmedabad: true,
          mumbai: false,
          delhi: false,
          newyork: true,
          california: false,
        }
      },
      {
        product_id: 2, 
        product_title: "sample sunglasses" ,
        product_image: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-product-3_large.png?format=jpg&quality=90&v=1530129341",
        product_desc: "Sample product watch. this is sample product watch. aksdjfnaskldj fnasdkjlfna jskldfn alkjsdfn alkjsdfn ljkasdnflajks dfnlakjsdfnlajks dnflajksfdn",
        like: false,
        item_removed: false,
        in_stock: true,
        category: 'sunglasses',
        price: 68,
        rating: 4,
        locations: {
          ahmedabad: true,
          mumbai: true,
          delhi: true,
          newyork: false,
          california: false,
        }
      },
      {
        product_id: 3, 
        product_title: "sample lamp" ,
        product_image: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-product-6_large.png?format=jpg&quality=90&v=1530129477",
        product_desc: "Sample product2 of another lamp. this is sample product watch no.3 .",
        like: true,
        item_removed: false,
        in_stock: true,
        category: 'lamp',
        price: 35,
        rating: 4,
        locations: {
          ahmedabad: true,
          mumbai: false,
          delhi: true,
          newyork: true,
          california: false,
        }
      },
      {
        product_id: 4, 
        product_title: "sample sunglasses" ,
        product_image: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-product-3_large.png?format=jpg&quality=90&v=1530129341",
        product_desc: "Sample product2 of another watch. this is sample product watch no.2 .",
        like: false,
        item_removed: false,
        in_stock: true,
        category: 'sunglasses',
        price: 45,
        rating: 4,
        locations: {
          ahmedabad: true,
          mumbai: true,
          delhi: true,
          newyork: true,
          california: true,
        }

      },
      {
        product_id: 5, 
        product_title: "sample sunglasses" ,
        product_image: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-product-5_large.png?format=jpg&quality=90&v=1530129458",
        product_desc: "Sample product2 of another watch. this is sample product watch no.2 .",
        like: false,
        item_removed: false,
        in_stock: false,
        category: 'watch',
        price: 75,
        rating: 4,
        locations: {
          ahmedabad: false,
          mumbai: false,
          delhi: false,
          newyork: false,
          california: false,
        }
      },
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
    ],
  }
  
    
    return setData(dummy_data);
}
//  */
const getData = () => {

const data = localStorage.getItem("TEMP_DATA_STORE")
let result = JSON.parse(data);
return result;
}


const setData = (json_object) => {
  let result = JSON.stringify(json_object);

  localStorage.setItem("TEMP_DATA_STORE",result)
  return "done";
}

module.exports = {
  setData, getData,
   setDummyData
}