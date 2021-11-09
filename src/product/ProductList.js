import React, {useEffect, useState} from 'react';
import { Box, Button, CircularProgress, IconButton, List, ListItem, ListItemText } from '@mui/material';
import {Edit as EditIcon, Delete as DeleteIcon} from '@mui/icons-material';
import { getApp, getApps,initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";
//import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";

import {config} from '../settings/firebaseConfig';
import AppMenu from '../ui/AppMenu';
import ProductAddEdit from '../product/ProductAddEdit';
//import { ThemeProvider } from '@emotion/react';
export default function ProductList() {
  //const firebaseApp = initializeApp(config);
  //initializeApp(config);
  getApps().length === 0 ? initializeApp(config) : getApp();
  const db = getFirestore();
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [products,setProducts]=useState([
    {desc:"iPad", price:20000},
    {desc:"iPhone X", price:30000},
   ]);
  
   const [currentProduct, setCurrentProduct] =useState({desc:"",price:0});
 /* 
  const products=[
    {desc:"iPad", price:20000},
    {desc:"iPhone X", price:30000},
   ];
  */
  
  
  useEffect(()=>{
    async function readData() {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "product"));
      //const querySnapshot = await getDocs(query(collection(db, "product"), orderBy("desc")));
      //const querySnapshot = getDocs(collection(db, "product"));
      const temp = [];
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
        //console.log(doc);
        //console.log(doc.id, " => ", doc.data());
        temp.push({id:doc.id, desc:doc.data().desc, price:doc.data().price});
      
      });
      console.log(temp);
      setProducts([...temp]);
      setIsLoading(false);
    }
    readData();
  },[db, open, deleted]);

  const close = function(){
    setOpen(false);
  }

  const addData = async function(){
    setCurrentProduct({desc:"",price:0});
    setOpen(true);
  }
  const editData = async function(index){
    setCurrentProduct(products[index]);
    setOpen(true);
  }

  const deleteData = async function(id){
    try{
      setIsLoading(true);
      await deleteDoc(doc(db, "product", id));
      console.log("deleted");
      setDeleted(deleted+1);
      setIsLoading(false);
    }
    catch (error){
      console.log(error);
    }   
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
          <IconButton edge="end" aria-label="edit" onClick={()=>editData(index)}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={()=>deleteData(product.id)}>
            <DeleteIcon />
          </IconButton>
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
      
      <Button variant="contained" color="primary" onClick={addData}>新增</Button>
      <ProductAddEdit open={open} close={close} product={currentProduct}/>
    </Box>

  );
}