import React from 'react';
import { Box,Button} from '@mui/material';
import { useHistory } from "react-router-dom";

import AppMenu from './AppMenu';

export default function Main() {
  const history = useHistory();
  const handleClick = function (link) {
    history.push(link);
  }
  return (
    <Box>
    <AppMenu/>
    <Button variant="contained" color="primary" onClick={handleClick("/product")}>Product</Button>
    <Button variant="contained" color="secondary" onClick={handleClick("/employee")}>Employee</Button>
    </Box>
  )

}