import React from 'react'
import { Link } from 'react-router-dom'

export default function () {
  return <section className='body'>
 <header class="navbar">
  <div class="dropdown dropdown-left">
    <button class="dropbtn-sh">MenuPlanner 
    </button>
  </div> 
</header>
    <main className="main">
          <h3 className="main__h3">Create your delicious weekly menu</h3>
        
          <Link className="main__login main__button" to="/login">Login</Link>
          <Link className="main__register main__button" to="/register">Register</Link>
    </main>
  </section>
} 