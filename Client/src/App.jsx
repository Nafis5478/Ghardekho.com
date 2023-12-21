import React, { Profiler } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from './pages/Signin'
import About from './pages/About'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Header from './components/Header'
import Privateroute from './components/Privateroute'
export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<Signin/>}/>
        <Route path="/sign-up" element={<Signup/>}/>
        <Route path="/about" element={<About/>}/>
        <Route element={<Privateroute/>}>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
