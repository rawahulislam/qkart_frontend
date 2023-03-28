import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Divider
} from "@mui/material";
import { Stack } from "@mui/system";
import { Container } from "@mui/system";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import ProductCard from "./ProductCard";
import {generateCartItemsFrom,getTotalCartValue} from "./Cart"
import Cart from "./Cart"
import { CompareArrowsOutlined } from "@mui/icons-material";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 *
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

const Products = (props) => {
  const loggedIn = window.localStorage.getItem("username");
  const { enqueueSnackbar } = useSnackbar("");
  const [loader , setLoader] = useState(false)
  const [search , getSearch] = useState("");
  const [err, setErr] = useState(true)
  const [cart, setState] = useState([]);
  const [data, setData] = useState([]);

  const token = window.localStorage.getItem("token");


 


  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
 
      
    
   const performSearch = async (text) => {
    try{
     const searchRes = await axios.get(`${config.endpoint}/products/search?value=${text}`)
     let res = await searchRes.data
     setLoader(res)
    }
    catch(error){
      if(error.response.status === 404){
       setErr(false)
      }
    }
  };
   

  
   const performAPICall = async () => {
    if(search===""){
    const response = await axios.get(`${config.endpoint}/products`)
    setLoader(await response.data)}
    else {
     performSearch(search)
    }
  }

  useEffect(()=>{
     let val = setTimeout(()=>{
      performAPICall();
     },500)
   
   return ()=> clearTimeout(val)

  },[search])

  useEffect(()=>{
    performAPICall()
  },[])
 
  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
 


  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  /**
   * Perform the API call to fetch the user's cart and return the response
   *
   * @param {string} token - Authentication token returned on login
   *
   * @returns { Array.<{ productId: string, qty: number }> | null }
   *    The response JSON object
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 401
   * {
   *      "success": false,
   *      "message": "Protected route, Oauth2 Bearer token not found"
   * }
   */
   const fetchCart = async (token) => {
    if (!token) return;

    try {
      let url=config.endpoint+'/cart';
      // TODO: CRIO_TASK_MODULE_CART - Pass Bearer token inside "Authorization" header to get data from "GET /cart" API and return the response data
      const response = await axios.get(url,{
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })
      setState(generateCartItemsFrom(await response.data , loader))
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
      return null;
    }
  };

 useEffect(()=>{
  
  fetchCart(token)
   
  
  
 },[loader])
 useEffect(()=>{
 
    fetchCart(token)
    
 },[data])


  // TODO: CRIO_TASK_MODULE_CART - Return if a product already exists in the cart
  /**
   * Return if a product already is present in the cart
   *
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { String } productId
   *    Id of a product to be checked
   *
   * @returns { Boolean }
   *    Whether a product of given "productId" exists in the "items" array
   *
   */
  const isItemInCart = (items, productId) => {
    var isIn = false;
    items.forEach((item) => {
      if (item.productId === productId) isIn = true;
    });
    return isIn;
    
   };
  
  /**
   * Perform the API call to add or update items in the user's cart and update local cart data to display the latest cart
   *
   * @param {string} token
   *    Authentication token returned on login
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { Array.<Product> } products
   *    Array of objects with complete data on all available products
   * @param {string} productId
   *    ID of the product that is to be added or updated in cart
   * @param {number} qty
   *    How many of the product should be in the cart
   * @param {boolean} options
   *    If this function was triggered from the product card's "Add to Cart" button
   *
   * Example for successful response from backend:
   * HTTP 200 - Updated list of cart items
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 404 - On invalid productId
   * {
   *      "success": false,
   *      "message": "Product doesn't exist"
   * }
   */
   const addToCart = async (
    token,
    items,
    products,
    productId,
    qty,
    options = { preventDuplicate: false }
  ) => {
    
    if (token) {
  
      if (!isItemInCart(items, productId)) {
        await addInCart(productId, qty);
      } else {
        enqueueSnackbar(
          "Item already in cart. Use the cart sidebar to update quantity or remove item.",
          { variant: "warning" }
        );
      }
    } else {
      enqueueSnackbar("Login to add an item to the Cart", {
        variant: "warning",
      });
    }
    
   

  };
  const handleQuantity = (productId, qty) => {
    addInCart(productId, qty);
  };
  const addInCart = async (productId, qty) => {
    // const url=`${config.endpoint}/cart`;
   
   let data = {productId , qty}
   
    // await axios.post(url,{"productId":"BW0jAAeDJmlZCF8i","qty":1},{ headers: {"Authorization" : `Bearer ${token}`} })
   let response = await axios.post(
        `${config.endpoint}/cart`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      //console.log(response)
      setState(generateCartItemsFrom(await response.data , loader))
      //etData(await response.data)

  }
 

  
  
  function lisner(e){
    getSearch(e.target.value)
  }

  const handleCart = (productId) => {
    // console.log('clicked')
    addToCart(localStorage.getItem("token"), cart, loader, productId, 1);
  };
  
 
  
  let loaded = loader? <ProductCard product={loader} handleAddToCart={handleCart}/> : <div className="loading"><CircularProgress/><h3>Loading Products...</h3></div> 
  return (
    <div>
      <Header fun={lisner}/>
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}

      {/* Search view for mobiles */}
      <TextField onChange={lisner}
        className="search-mobile"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
      />
      
      <Grid container>
        <Grid item xs={12} md={9}>
          <Box className="hero">
            <p className="hero-heading">
              India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
              to your door step
            </p>
            <Divider />
          <Box>
          </Box>
          <Divider/>
          
          </Box>
          <Box>
            <br/>
          {err ? loaded : <h3 className="loading">no products found<SentimentDissatisfied/></h3>}  

          </Box>
          
          
        </Grid>
        <Grid item xs={12} md={3} bgcolor="#E9F5E1">
          
          {token !== null && (
          
            <Cart
            items={cart} products={loader} handleQuantity={handleQuantity}
              
            />
        )}
          </Grid>
        </Grid>
        
      
    
    
    
    </div>
  );
};

export default Products;
