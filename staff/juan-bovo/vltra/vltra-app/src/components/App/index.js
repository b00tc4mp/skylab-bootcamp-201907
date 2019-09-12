import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import Home from '../Home'
import Header from '../Header'
import Footer from '../Footer'
import Main from '../Main'
import Register from '../Register'
import Login from '../Login'
import RegisterSuccess from '../Register-success'

import './style.sass'

function App() {
  return <>
  {/* <Header/>
  <Login/>
  <Register/>
  <Main/>
<Footer/> */}
  <Router>
    <Header/>
    <Route exact path="/" component={Home}/>
    <Route path="/login" component={Login}/>
    <Route path="/register" component={Register}/>
    <Route path="/register-success" component={RegisterSuccess}/>
    <Footer/>
  </Router>


  </>
}

export default App
