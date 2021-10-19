import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import AppMenu from '../ui/AppMenu';
export default function ProductList() {
   
  const products= [
    {desc:"iPad", price:20000},
    {desc:"iPhone X", price:30000},
   ];
   
  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
      backgroundColor: 'background.paper',
      color: 'black',
      textAlign: 'left'
    }}>
      <AppMenu/>
      <List subheader="Product list" aria-label="product list">
      {products.map((product, index) => 
        <ListItem divider key={index}>
          <ListItemText primary={product.desc} secondary={"NT$"+product.price}></ListItemText>
        </ListItem>)}
      </List>
    </Box>

  );
}