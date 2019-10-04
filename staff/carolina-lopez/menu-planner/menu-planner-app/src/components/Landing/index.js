import React from 'react'
import { Link } from 'react-router-dom'

export default function () {
  return <section className='body'>
 <header className="navbar">
  <div className="dropdown dropdown-left">
    <button className="dropbtn-sh">MenuPlanner 
    </button>
  </div> 
</header>
    <main className="main">
          <img className="main__image" src="../../mpgrey.png"/>
          <h3 className="main__h3">Create your delicious weekly menu</h3>
        
          <Link className="main__login main__button" to="/login">Login</Link>
          <Link className="main__register main__button" to="/register">Register</Link>
    </main>
  </section>
} 