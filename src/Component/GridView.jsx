import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { FaHandHoldingMedical } from "react-icons/fa6";
import { Link,useNavigate } from 'react-router-dom';


const GridView = () => {

    const [employees, setEmployees] = useState([]);

    const loadEmploy = () =>{
        axios.get('http://localhost:3033/employs')
          .then(response => setEmployees(response.data))
          .catch(error => console.error('Error fetching data:', error));

    }


    useEffect(() => {
        loadEmploy();
        
      }, []);

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
    <div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-9 mt-2 gap-4">
        {employees.map(employee => (
          <div key={employee.id} className="bg-white rounded-lg p-4 shadow-md relative">

            <div>

                <img className='w-full h-[180px]' src={employee.photo}  />
                <p className="text-sm font-semibold pt-1">{`${employee.first_name} ${employee.last_name}`}</p>
                <p className="text-sm font-semibold">{employee.email}</p>
                <p className='text-sm font-semibold'>{employee.number}</p>
                <p className='text-sm font-semibold'>{employee.gender === "F" ? "Female" : "Male"}</p>
            </div>
            
            <div className='absolute bottom-1 pl-10 flex right-1 gap-2'>
                <button>
                <MdDelete onClick={()=>Delete(employee.id)} className='h-8 w-8  rounded-2xl text-white text-xs' style={{ backgroundColor: '#F53751' }}></MdDelete>
                </button>
               
                <Link to={`/updateEmploy/${employee.id}`}>
                <FaHandHoldingMedical className='h-8 w-8  rounded-2xl text-white text-xs' style={{ backgroundColor: '#5BD165' }}></FaHandHoldingMedical>
                </Link>
            </div>
              

            

            
          </div>
        ))}
      </div>
    </div>
  )
}

export default GridView

