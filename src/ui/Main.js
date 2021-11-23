import React from 'react';
import {Box} from '@mui/material';
//import { useHistory } from "react-router-dom";

import AppMenu from './AppMenu';
import SignUp from '../account/SignUp';
import SignIn from '../account/SignIn';
import SignOut from '../account/SignOut';
import {useContext} from 'react';
import {AuthContext, STATUS} from '../account/AuthContext';


export default function Main() {
  const authContext = useContext(AuthContext);
  
/*
  const history = useHistory();
  const handleClick = function (link) {
    history.push(link);
  }
*/
  return (
    <Box>
    <AppMenu/>
    {authContext.status===STATUS.toSignUp?
      <SignUp/>
      :authContext.status===STATUS.toSignIn?
      <SignIn/>
      :
      <SignOut/>
      }    
    </Box>
  )

}