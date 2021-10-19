import React from 'react';

import {NavLink} from 'react-router-dom';
import { AppBar, Button, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
 
export default function AppMenu() {
  const theme = useTheme();
  //const activeStyle = { backgroundColor:(theme) => theme.palette.secondary.main, color:"black" };
  const activeStyle = { backgroundColor:theme.palette.secondary.main, color:"black" };
  //const activeStyle = { backgroundColor:"theme.palette.primary.light", color:"black" };
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Button component={NavLink} to='/product' activeStyle={activeStyle} color="inherit">product</Button>
        <Button component={NavLink} to='/employee' activeStyle={activeStyle} color="inherit">employee</Button>
      </Toolbar>
    </AppBar>
  )

}