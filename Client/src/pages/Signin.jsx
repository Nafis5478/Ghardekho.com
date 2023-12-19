import React from 'react'
import {Link} from 'react-router-dom'
export default function Signin() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text text-3xl text-center font-semibold my-7'>Sign in</h1>
      <form className='flex flex-col gap-4'>
        <input type="username" placeholder='Username' className='border p-3 rounded-lg' id='username' />
        <input type="password" placeholder='Password' className='border p-3 rounded-lg' id='password' />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign in</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Create an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
    </div>
  )
}
