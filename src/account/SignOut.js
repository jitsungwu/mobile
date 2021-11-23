import React, {useState} from 'react';
import {Button} from '@mui/material';
import { getApps, initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import {config} from '../settings/firebaseConfig';
import {useContext} from 'react';
import {AuthContext, STATUS} from '../account/AuthContext';

//import { Box } from '@mui/system';

export default function SignOut(props) {
  const authContext = useContext(AuthContext);
  if (getApps().length===0) {
    initializeApp(config);
  }
  const [message, setMessage] = useState("");
  const handleSubmit = async function(){
    try {
      const auth = getAuth();
      await signOut(auth);
      setMessage("");
      authContext.setStatus(STATUS.toSignIn);
    }
    catch(error){
      setMessage(""+error);
    }
  }
  
  return(
    
    <form>
      <Button variant="contained" color="primary" onClick={handleSubmit}>登出</Button>
      {message}<br/>
    </form>
    
  )
}