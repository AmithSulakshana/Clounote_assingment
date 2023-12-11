
import React from "react";
import Navbar from "./Component/Navbar";
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from "./Pages/Home";
import Employee from "./Pages/Employee";
import AddEmployee from "./Pages/AddEmployee";
import UpdateEmploy from "./Pages/UpdateEmploy";



function App() {
  return (
    <div>
      <Navbar/>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path='/employs/:id' element={<Employee/>} ></Route> 
          <Route path='/add' element={<AddEmployee/>} ></Route>
          <Route path='/updateEmploy/:id' element={<UpdateEmploy/>} ></Route>
          
          
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
