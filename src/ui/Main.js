import React from 'react';
import {Box} from '@mui/material';
//import { useHistory } from "react-router-dom";

import AppMenu from './AppMenu';
import SignUp from '../account/SignUp';

export default function Main() {
/*
  const history = useHistory();
  const handleClick = function (link) {
    history.push(link);
  }
*/
  return (
    <Box>
    <AppMenu/>
    <SignUp/>
    </Box>
  )

}