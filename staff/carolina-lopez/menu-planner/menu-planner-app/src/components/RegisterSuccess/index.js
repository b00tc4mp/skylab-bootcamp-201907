import React from 'react'

export default function ({ onBack}) {
  return <>
  <header>
    <nav className="nav">
      <a className="nav__h2" href="#"><h2 className="nav__h2">MenuPlanner</h2></a>
      <a className="nav__icon" href="user-panel.html"><i className="far fa-user-circle"></i></a>
    </nav>
  </header>
  <main className="main">
      <section className="reg-success__section">
          <p>User successfully registered, you can now proceed to <Link href="#" to='/login'>Login</Link>
          </p>
      </section>
  </main>
  </>
}