import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { Link,useNavigate } from 'react-router-dom';

function Tableview() {

    const [data,setData]=useState([])

    
    const loadEmploy = () => {
        axios.get('http://localhost:3033/employs')
        .then(res=>setData(res.data))
        .catch(err => console.log(err))
        };
         
    useEffect(()=> {
        loadEmploy();
    },[])

   

    function Delete(id) {

        const isConfirmed = window.confirm('Are you sure you want to delete this item?');
    
        
        if (isConfirmed) {
          axios.delete(`http://localhost:3033/employs/${id}`)
            .then(() => {
              loadEmploy();
              
            })
            .catch(error => {
              console.error('Error deleting item:', error);
            });
        }
      }

  return (
    <div className='w-full sm:w-[600px] md:w-[750px] lg:w-[1000px] xl:w-[1120px] mx-auto xl:ml-[120px]'>
        <table className='table-fixed w-full border'>
            <thead>
                <tr>
                    <th className='w-1/7 border bg-green-500'>Image</th>
                    <th className='w-1/7 border bg-green-500'>First Name</th>
                    <th className='w-1/7 border bg-green-500'>Last Name</th>
                    <th className='sm:w-[150px] md:w-[220px] lg:w-[220px] xl:w-[220px] border bg-green-500'>Email</th>
                    <th className='w-1/7 md:w-[100px] lg:1/7 xl:w-1/7 border bg-green-500'>Phone</th>
                    <th className='w-1/7 border bg-green-500'>Gender</th>
                    <th className='w-1/7 border bg-green-500'>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((d,i)=>(
                    <tr key={i}>
                        <td className='w-1/7 md:pl-[20px] lg:pl-[40px] xl:pl-[60px] border'>
                        {d.photo && <img src={d.photo} alt="User" style={{ width: '50px', height: '50px' }} />}
                        </td>
                        <td className='w-1/7 pl-[10px] border text-xs font-semibold'>{d.first_name}</td>
                        <td className='w-1/7 pl-[10px] border text-xs font-semibold'>{d.last_name}</td>

                        <td className='w-1/7 border pl-[10px] text-xs lg:text-xs xl:text-xs font-semibold overflow-hidden'>
                                <div className='whitespace-nowrap overflow-x-auto'>
                                    {d.email}
                                </div>
                         </td>

                        <td className='w-1/7 border pl-[10px] text-xs lg:text-xs xl:text-xs font-semibold overflow-hidden'>
                                <div className='whitespace-nowrap overflow-x-auto'>
                                    {d.number}
                                </div>
                         </td>
                        <td className='w-1/7 pl-[10px] border text-xs font-semibold'>{d.gender === "F" ? "Female" : "Male"}</td>
                        <td className='w-1/7 border pt-5 pl-2 lg:pl-9 xl:pl-10 flex'>

                            <Link className='bg-slate-600 text-white font-semibold text-sub  sm:text-xs md:text-sm lg:text-sm xl:text-lg
                              h-[25px] sm:h-[25px] w-[32px] md:h-[25px] md:w-[33px] lg:h-[25px] lg:w-[40px] xl:h-[28px] xl:w-[50px] 
                             text-center  rounded-md' to={`/updateEmploy/${d.id}`}>Edit</Link>
                           
                           <button> <MdDelete onClick={()=>Delete(d.id)}  className='h-8 w-8 text-red-500'></MdDelete></button>
                            
                        </td>

                    </tr>
                ))

                }
            </tbody>
        </table>
      
    </div>


  )
  

}

export default Tableview;
