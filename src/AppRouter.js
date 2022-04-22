import React, {useState} from 'react';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';

import ProductList from './product/ProductList';
import EmployeeList from './employee/EmployeeList';
import MachineList from './machine/MachineList';
import ImageUpload from './ui/ImageUpload';
import Main from './ui/Main';
import {AuthContext, STATUS} from './account/AuthContext';

export default function AppRouter(){
  const [status, setStatus] = useState(STATUS.toSignIn);
  return(
    <AuthContext.Provider value={{status, setStatus}}>
      <Router>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/product" element={<ProductList/>}/>
          <Route path="/employee" element={<EmployeeList/>}/>
          <Route path="/machine" element={<MachineList/>}/>
          <Route path="/image" element={<ImageUpload/>}/>

        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

