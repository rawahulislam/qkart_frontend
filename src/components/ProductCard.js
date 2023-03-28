import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
  Grid,
  Container,
  Box,
} from "@mui/material";
import React from "react";
import {useState} from 'react'
import "./ProductCard.css";
import Cart from "./Cart"


const ProductCard = ({ product, handleAddToCart }) => {



  return (
    <Box>
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {product.map((product) => (
          <Grid item xs={12} sm={4} md={3} key={product._id}>
            <Card>
              <CardMedia component="img" image={product.image} alt="some" />
              <CardContent>
                <Typography color="black" variant="subtitle">
                  {product.name}
                </Typography>
                <Typography color="black" fontWeight="bold" variant="h6">
                  ${product.cost}
                </Typography>
                <Rating
                  name="half-rating-read"
                  defaultValue={4}
                  precision={product.rating}
                  readOnly
                />
              </CardContent>
              <CardActions>
              <Button name="add to cart" role="button" className="button" variant="contained" fullWidth onClick={()=>handleAddToCart(product._id)}>ADD TO CART</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        
      </Grid>
    </Box>
  );
};

export default ProductCard;
