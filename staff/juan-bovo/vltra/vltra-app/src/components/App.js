import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'

import Header from './Header/index.js'
import Footer from './Footer/index.js'
import Main from './Main/index.js'

import './App.sass'

function App() {
  return <>
  <Header />
  <Main/>
  <Footer/>
  </>
}

export default App
