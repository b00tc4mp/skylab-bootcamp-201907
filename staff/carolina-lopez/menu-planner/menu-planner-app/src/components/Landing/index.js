import React from 'react'
import { Link } from 'react-router-dom'

export default function () {
  return <section className='body'>
    <header>
      <nav className="nav">
        <a className="nav__h2" href="index.html"><h2 className="nav__h2">MenuPlanner</h2></a>
      </nav>
    </header>
    <main className="main">
          <h3 className="main__h3">Create Menu</h3>
        
          <Link className="main__login main__button" to="/login">Login</Link>
          <Link className="main__register main__button" to="/register">Register</Link>
    </main>
  </section>
} 