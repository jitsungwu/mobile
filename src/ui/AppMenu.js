import React from 'react';

import {NavLink} from 'react-router-dom';
import { AppBar, Button, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
 
export default function AppMenu() {
  const theme = useTheme();
  //const activeStyle = { backgroundColor:(theme) => theme.palette.secondary.main, color:"black" };
  //const activeStyle = { backgroundColor:theme.palette.secondary.main, color:"black" };
  //const activeStyle = { backgroundColor:"theme.palette.primary.light", color:"black" };
  const setActiveStyle= function (isActive){
    return isActive? { color: 'black',backgroundColor: theme.palette.secondary.main}:
          { color: 'inherit',backgroundColor: 'inherit'}

  }
  
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Button component={NavLink} to='/product' style={({isActive})=>setActiveStyle(isActive)} >product</Button>
        <Button component={NavLink} to='/employee' style={({isActive})=>setActiveStyle(isActive)}>employee</Button>
      </Toolbar>
    </AppBar>
  )

}