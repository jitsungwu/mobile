import React, {useEffect, useState} from 'react';
import { Button, DialogActions, TextField  } from '@mui/material';
import { Dialog, DialogTitle,DialogContent  } from '@mui/material';
import { getFirestore, collection, addDoc, setDoc } from "firebase/firestore";
export default function ProductAddEdit(props) {

  const [product, setProduct] = useState({
    desc:"",
    price:0});

  useEffect(()=>setProduct({...props.product}),[props.product]);

  console.log(props.product.desc);
  const action = !props.product.id ? "新增":"修改";
  //if id is null -> add
  //if id is not null -> edit
  

  const handleChange = function(e){
    setProduct({...product,[e.target.name]:e.target.value})
  }

  const update = async function(){
    const db = getFirestore();
    try{
      if (action === "新增"){
        const docRef = await addDoc(collection(db,"product"),{
          desc:product.desc,
          price:parseInt(product.price)
          });
        console.log(docRef.id);
      }
      else {
        await setDoc(collection(db,"product",product.id),{
          desc:product.desc,
          price:parseInt(product.price)
        });
      }
    }
    catch(e){
      console.log(e);
    }
    props.close();
  }

  return (
    <Dialog open={props.open}>
      <DialogTitle>{action}產品</DialogTitle>
      <DialogContent>
        <TextField label ="產品描述" name ="desc" variant="outlined" value={product.desc} onChange={handleChange}/>
        <TextField label ="產品價格" type="number" name ="price" variant="outlined" value={product.price} onChange={handleChange}/>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={update}>{action}</Button>
        <Button variant="contained" color="secondary" onClick={props.close}>取消</Button>
      </DialogActions>
    </Dialog>
  );
}