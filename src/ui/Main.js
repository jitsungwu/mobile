import React, {useState} from 'react';
import {Box} from '@mui/material';
//import { useHistory } from "react-router-dom";

import AppMenu from './AppMenu';
import SignUp from '../account/SignUp';
import SignIn from '../account/SignIn';
import SignOut from '../account/SignOut';


export default function Main() {
  const [status, setStatus] = useState("signIn");
/*
  const history = useHistory();
  const handleClick = function (link) {
    history.push(link);
  }
*/
  return (
    <Box>
    <AppMenu/>
    {status==="signUp"?
      <SignUp setStatus={setStatus}/>
      :status==="signIn"?
      <SignIn setStatus={setStatus}/>
      :
      <SignOut setStatus={setStatus}/>
      }    </Box>
  )

}