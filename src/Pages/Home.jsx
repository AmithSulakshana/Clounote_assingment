import React from 'react';
import Tableview from '../Component/Tableview';
import { useState } from 'react';
import { IoListCircleSharp } from "react-icons/io5";
import { IoGridSharp } from "react-icons/io5";
import { Link,Navigate,useNavigate } from 'react-router-dom';
import GridView from '../Component/GridView';


const Home = ({ data }) => {
  const [isCardView, setIsCardView] = useState(true);
  const Navigate=useNavigate();


  const toggleView = () => {
    setIsCardView((prev) => !prev);
  };
    
  return (
    <div>
      
       <div>
            <div className='flex gap-2 pt-2 justify-end pb-1'>
            <button onClick={()=> Navigate("/add")} className='bg-blue-800 rounded-2xl text-white font-semibold w-32 h-8 '>Add Employee</button>
                
           
    
            <button 
                className=" text-white h-8 w-8"
                onClick={toggleView}
            >

              {isCardView ? <IoGridSharp className='h-8 w-8 text-blue-800'/> : <IoListCircleSharp className='h-8 w-8 text-blue-800'/>}
           </button>

           </div> 

            {isCardView ? <GridView data={data} /> : <Tableview data={data} />}
    
  
       </div>
    </div>
  )
}

export default Home;
