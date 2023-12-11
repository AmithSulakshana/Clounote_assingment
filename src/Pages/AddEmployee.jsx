import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      number: '',
      gender: '',
    },

    validationSchema: Yup.object({
        first_name: Yup.string().required('First Name is required'),
        last_name: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        number: Yup.string().matches(/^\d+$/, 'Invalid phone number').required('Phone number is required'),
      }),
      onSubmit: (values) => {
        axios.post('http://localhost:3033/employs', values).then(() => navigate('/'));
      },
    });
  return (
    <div className='flex flex-col gap-2 items-center relative '>
    <div className='pt-2 absolute right-2'>
      <button onClick={() => navigate('/')} className='bg-blue-800 rounded-2xl text-white font-semibold w-32 h-8'>
        List View
      </button>
    </div>

    <div className='pl-1 lg:pl-9 xl:pl-9 pt-20 '>
      <form
        onSubmit={formik.handleSubmit}
        className='flex flex-col w-[380px] h-[380px]  lg:w-[400px] lg:h-[400px] xl:w-[400px] xl:h-[400px] rounded-2xl relative border'
      >
        <div className={`mb-4 pt-9 pl-4 ${formik.touched.first_name && formik.errors.first_name ? 'border-red-500' : ''}`}>
          <label className='font-semibold '>First Name</label>
          <input
            className='absolute right-5 h-8 w-[260px] bg-slate-300 font-semibold pl-1'
            {...formik.getFieldProps('first_name')}
            type='text'
          />
          {formik.touched.first_name && formik.errors.first_name && (
            <div className='text-red-500 text-xs pt-2'>{formik.errors.first_name}</div>
          )}
        </div>

        <div className={`mb-4 pl-4 ${formik.touched.last_name && formik.errors.last_name ? 'border-red-500' : ''}`}>
          <label className='font-semibold'>Last Name</label>
          <input
            className='absolute right-5 h-8 w-[260px]  bg-slate-300 font-semibold pl-1'
            {...formik.getFieldProps('last_name')}
            type='text'
          />
          {formik.touched.last_name && formik.errors.last_name && (
            <div className='text-red-500 text-xs pt-2'>{formik.errors.last_name}</div> 
          )}
        </div>

        <div className={`mb-4 pl-4 ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}>
          <label className='font-semibold'>Email</label>
          <input
            className='absolute right-5 h-8 w-[260px]  bg-slate-300 font-semibold pl-1'
            {...formik.getFieldProps('email')}
            type='email'
          />
          {formik.touched.email && formik.errors.email && (
            <div className='text-red-500 text-xs pt-2'>{formik.errors.email}</div>
          )}
        </div>

        <div className={`mb-4 pl-4 ${formik.touched.number && formik.errors.number ? 'border-red-500' : ''}`}>
          <label className='font-semibold'>Phone</label>
          <input
            className='absolute right-5 h-8 w-[260px]  bg-slate-300 font-semibold pl-1'
            {...formik.getFieldProps('number')}
            type='text'
          />
          {formik.touched.number && formik.errors.number && (
            <div className='text-red-500 text-xs pt-2'>{formik.errors.number}</div>
          )}
        </div>

        <div className='mb-4 pl-4'>
          <label className='font-semibold' htmlFor='gender'>Gender</label>
          <select
            id='gender'
            className='border  absolute right-5 h-8 w-[260px]  bg-slate-300 font-semibold pl-1'
            {...formik.getFieldProps('gender')}
          >
            <option className='font-semibold' value='M'>Male</option>
            <option className='font-semibold' value='F'>Female</option>
          </select>
        </div>

        <div>
          <button
            type='submit'
            className='absolute right-5 border-sky-700 border text-sky-700 w-24 h-9 rounded-lg'
          >
            Add
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default AddEmployee;
