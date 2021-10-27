import React, {useState} from 'react';
import { Button, Dialog, TextField  } from '@mui/material';
import { getFirestore, collection, addDoc } from "firebase/firestore";
export default function ProductAdd(props) {
  const [product, setProduct] = useState({desc:"",price:0});
  //const [open, setOpen] = useState(props.open);


  const handleClick = function(e){
    setProduct({...product,[e.target.name]:e.target.value})
  }

  const update = async function(){
    const db = getFirestore();
    //props.update(product);
    try{
      const docRef = await addDoc(collection(db,"product"),{
        desc:product.desc,
        price:parseInt(product.price)
        });
      console.log(docRef.id);
    }
    catch(e){
      console.log(e);
    }
    props.close();
  }

  return (
    <Dialog open={props.open}>
      <TextField label ="產品描述" name ="desc" variant="outlined" value={product.desc} onChange={handleClick}/>
      <TextField label ="產品價格" type="number" name ="price" variant="outlined" value={product.price} onChange={handleClick}/>

    <Button variant="contained" color="primary" onClick={update}>新增</Button>
    </Dialog>
  );
}