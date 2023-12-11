 import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
 
 function Employee() {

    const [data,setData]=useState();
    const {id}=useParams()

    useEffect(()=> {
        axios.get(`http://localhost:3033/employs/${id}`)
        .then(res=>setData(res.data))
        .catch(err => console.log(err))
    },[])

    
   return (
     <div>
        {console.log(data)}
       
     </div>
   )
 }
 
 export default Employee;
 