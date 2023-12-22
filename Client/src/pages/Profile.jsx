import { current } from '@reduxjs/toolkit';
import React from 'react'
import { useSelector } from 'react-redux';
export default function Profile() {
  const {currentUser}=useSelector((state)=>state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center my-5 text-3xl font-semibold'>
        Profile
      </h1>
      <form className='flex flex-col gap-4' >
        <img src={currentUser.avatar} alt={'profile'} className='rounded-full h-30 w-30 object-cover cursor-pointer self-center mt-2'/>
        <input
          type='text'
          placeholder='Username'
          className='border p-3 rounded-lg'
          id='username'
        />
        <input
          type='email'
          placeholder='Email'
          className='border p-3 rounded-lg'
          id='email'
        />
        <input
          type='text'
          placeholder='Password'
          className='border p-3 rounded-lg'
          id='password'
        />
        <button
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          update
        </button>
        <button
          className='bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          add new list
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  )
}
