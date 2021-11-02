import React, {useEffect, useState} from 'react';
import { Box, Button, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import { initializeApp } from "firebase/app";
//import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";

import {config} from '../settings/firebaseConfig';
import AppMenu from '../ui/AppMenu';
import ProductAdd from '../product/ProductAdd';
//import { ThemeProvider } from '@emotion/react';
export default function ProductList() {
  //const firebaseApp = initializeApp(config);
  initializeApp(config);
  const db = getFirestore();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [products,setProducts]=useState([
    {desc:"iPad", price:20000},
    {desc:"iPhone X", price:30000},
   ]);
  
 /* 
  const products=[
    {desc:"iPad", price:20000},
    {desc:"iPhone X", price:30000},
   ];
  */
  
  
  useEffect(()=>{
    async function readData() {
      setIsLoading(true);
      //const querySnapshot = await getDocs(collection(db, "product"));
      const querySnapshot = await getDocs(query(collection(db, "product"), orderBy("desc")));
      //const querySnapshot = getDocs(collection(db, "product"));
      const temp = [];
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
        //console.log(doc);
        console.log(doc.id, " => ", doc.data());
        temp.push({desc:doc.data().desc, price:doc.data().price});
      
      });
      console.log(temp);
      setProducts([...temp]);
      setIsLoading(false);
    }
    readData();
  },[db, open]);

  const close = function(){
    setOpen(false);
  }
  
/*
  const readData = async function() {
    const querySnapshot = await getDocs(collection(db, "product"));
    const temp = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      temp.push({desc:doc.data().desc, price:doc.data().price});
      
    });
    setProducts([...temp]);
  };
  //readData();


useEffect(readData
  ,[]);
*/
  const ProductListComponent = function (){
    return (
      <List subheader="Product list" aria-label="product list">
      {products.map((product, index) => 
        <ListItem divider key={index}>
          <ListItemText primary={product.desc} secondary={"NT$"+product.price}></ListItemText>
        </ListItem>)}
      </List>
    )
  }
  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
      backgroundColor: 'background.paper',
      color: 'black',
      textAlign: 'left'
    }}>
      <AppMenu/>
      {!isLoading ?
      <ProductListComponent/>
       :
      <CircularProgress />
      }
      
      <Button variant="contained" color="primary" onClick={()=>{setOpen(true)}}>新增</Button>
      <ProductAdd open={open} close={close}/>
    </Box>

  );
}