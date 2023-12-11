import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';



function UpdateEmploy() {

  const [fName, setFname] = useState('');
  const [lName, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [gender, setGender] = useState('');
  const [photo, setPhoto] = useState('');

  const [errors, setErrors] = useState({
    fName: '',
    lName: '',
    email: '',
    number: '',
  });

  const navigate = useNavigate();
  const Navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3033/employs/${id}`)
      .then((res) => {
        setFname(res.data.first_name);
        setLname(res.data.last_name);
        setEmail(res.data.email);
        setNumber(res.data.number);
        setGender(res.data.gender);
        setPhoto(res.data.photo);
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
      });
  }, [id]);

  const validateForm = () => {
    const newErrors = {
      fName: '',
      lName: '',
      email: '',
      number: '',
    };

    if (!fName.trim()) {
      newErrors.fName = 'First Name is required';
    }

    if (!lName.trim()) {
      newErrors.lName = 'Last Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!number.trim()) {
      newErrors.number = 'Phone Number is required';
    } else if (!/^\d+$/.test(number)) {
      newErrors.number = 'Invalid phone number format';
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const data = {
    first_name: fName,
    last_name: lName,
    email: email,
    number: number,
    gender: gender,
    photo: photo,
  };

  const Update = (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios.put(`http://localhost:3033/employs/${id}`, data)
        .then(() => navigate('/'))
        .catch((error) => {
          console.error('Error updating employee data:', error);
          
        });
    }
  };

  return (
    <div className='flex flex-col gap-2 items-center w-screen relative'>
      <div className='pt-2 absolute right-2 '>
        <button onClick={() => Navigate("/")} className='bg-blue-800 rounded-2xl text-white font-semibold w-32 h-8'>List View</button>
      </div>

      <div className='w-[380px] h-[380px]  lg:w-[400px] lg:h-[400px] xl:w-[400px] xl:h-[400px] pt-20 '>
        <form className='flex flex-col w-[380px] h-[380px]  lg:w-[400px] lg:h-[400px] xl:w-[400px] xl:h-[400px] border rounded-2xl gap-5  relative'>
          <div className='pt-7 pl-2'>
            <label className='font-semibold'>First Name</label>
            <input
              className={`absolute right-1 h-8 w-[285px] bg-slate-300 font-semibold pl-1 ${errors.fName ? 'border-red-500' : ''}`}
              value={fName}
              onChange={(e) => setFname(e.target.value)}
              type='text'
            />
            {errors.fName && <p className="text-red-500 text-xs pt-2">{errors.fName}</p>}
          </div>

          <div className=' pl-2'>
            <label className='font-semibold' >Last Name</label>
            <input
              className={`absolute right-1 h-8 w-[285px] bg-slate-300 font-semibold pl-1  ${errors.lName ? 'border-red-500' : ''}`}
              value={lName}
              onChange={(e) => setLname(e.target.value)}
              type='text'
            />
            {errors.lName && <p className="text-red-500 text-xs pt-2">{errors.lName}</p>}
          </div>

          <div className=' pl-2'>
            <label className='font-semibold'>Email</label>
            <input
              className={`absolute right-1 h-8 w-[285px] bg-slate-300 font-semibold pl-1 ${errors.email ? 'border-red-500' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='text'
            />
            {errors.email && <p className="text-red-500 text-xs pt-2">{errors.email}</p>}
          </div>

          <div className=' pl-2'>
            <label className='font-semibold'>Phone</label>
            <input
              className={`absolute right-1 h-8 w-[285px] bg-slate-300 font-semibold pl-1 ${errors.number ? 'border-red-500' : ''}`}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              type='text'
            />
            {errors.number && <p className="text-red-500 text-xs pt-2">{errors.number}</p>}
          </div>

          <div className=' pl-2'>
                 <label className='font-semibold' htmlFor='gender'>Gender</label>
                 <select
                 id='gender'
                 className='border w-[285px] h-8 absolute right-1 bg-slate-300 font-semibold pl-1  '
                 value={gender}
                 onChange={(e) => setGender(e.target.value)}
                >
                 <option className= 'font-semibold pl-1' value='M'>Male</option>
                 <option  className= 'font-semibold pl-1' value='F'>Female</option>
                 </select>
             </div>
          
          
          
          <div className='pt-6'>
            <button className=' border-sky-700 text-sky-700 border w-24 h-9 rounded-lg absolute right-1 ' onClick={Update}>Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateEmploy;
