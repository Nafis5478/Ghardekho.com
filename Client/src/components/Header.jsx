import React from "react";
import { Link } from "react-router-dom";
import {FaSearch} from 'react-icons/fa' 
import { useSelector } from "react-redux";
export default function Header() {
  const {currentUser}=useSelector((state)=>state.user);
  // const {avatar}=currentUser;
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link to="/">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap p-3">
          <span className="text-slate-500">Ghardekho</span>
          <span className="text-slate-700">.com</span>
        </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input type="text" placeholder="Search..." className="bg-transparent focus: outline-none w-24 sm:w-64" />
          <FaSearch className='text-slate-600'></FaSearch>
        </form>
        <ul className="flex gap-4">
            <Link to="/"><li className="hidden sm:inline text-slate-700 hover:underline">Home</li></Link>
            <Link to="/about"><li className="hidden sm:inline text-slate-700 hover:underline">About</li></Link>

            <Link to="/profile">
              {currentUser ? ( <img src={currentUser.avatar} alt='profile' className="rounded-full h-7 w-7 object-cover"/> ):(<li className=" text-slate-700 hover:underline">SignIn</li>)}
            </Link>
        </ul>
      </div>
    </header>
  );
}
