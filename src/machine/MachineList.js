import React, {useEffect, useState} from 'react';
//import {useContext} from 'react';
import { Box, CircularProgress, List, ListItem, ListItemText } from '@mui/material';

//import { Fab, IconButton } from '@mui/material';
//import {Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon} from '@mui/icons-material';
import { getApp, getApps,initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
//import { deleteDoc, doc } from "firebase/firestore";
//import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";

import {config} from '../settings/firebaseConfig';
import AppMenu from '../ui/AppMenu';
//import {AuthContext, STATUS} from '../account/AuthContext';

export default function MachineList() {
  //const authContext = useContext(AuthContext);

  getApps().length === 0 ? initializeApp(config) : getApp();
  const db = getFirestore();
  const [isLoading, setIsLoading] = useState(false);

  const [locations,setLocations]=useState([

   ]);
  
  
  
  useEffect(()=>{
    async function readData() {
      setIsLoading(true);
      setLocations([]);
      const querySnapshot = await getDocs(collection(db, "location"));
      //const temp = [];
      querySnapshot.forEach(async (doc) => {
        console.log(doc.data().name);
        const querySnapshotMachine = await getDocs(collection(db, "location/"+doc.id+"/machine"));
        const tempMachines =[];
        querySnapshotMachine.forEach (async(machine)=>{
          console.log(machine.data());
            tempMachines.push(machine.data().location);
        })
        setLocations((current)=>[...current, {id:doc.id, name:doc.data().name, machines:[...tempMachines]}]);
        //temp.push({id:doc.id, desc:doc.data().name, machines:[...tempMachines]});
      
      });
      //console.log("temp:", temp);
      //setLocations(()=>[...temp]);
      setIsLoading(false);
    }
    readData();
  },[db]);

  const MachineListComponent = function (){
    return (
      <List subheader="Location list" aria-label="location list">
        {console.log("locations:", locations)}
      {locations.map((location) => 
        <ListItem divider key={location.id}>
          <ListItemText primary={location.name} 
            secondary = {location.machines.map((machine)=>machine+" ")}>
          </ListItemText>
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
      <MachineListComponent/>
       :
      <CircularProgress />
      }
    </Box>

  );
}