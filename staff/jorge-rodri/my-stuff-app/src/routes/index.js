import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import {setBasepath} from "hookrouter";


const routes = {
  '/register': () => <Register />,
  '/login': () => <Login />
 }

 export default routes