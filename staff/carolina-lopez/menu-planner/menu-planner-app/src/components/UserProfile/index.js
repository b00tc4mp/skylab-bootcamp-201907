import React, {useState, useEffect} from 'react'
import { Link, withRouter } from 'react-router-dom'
import logic from '../../logic'

export default withRouter(function({history, onLogout}){
  
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    (async () => {
      const user = await logic.retrieveUser()
      setUser(user)
    })()
  }, [history.location])
  
  return <section className='body'>
 <header>
    <nav className="nav">
      <a className="nav__h2" href="#"><h2 className="nav__h2">MenuPlanner</h2></a>
      <div className="dropdown">
        <button className="nav__icon dropdown__dropbtn">
          <i className="far fa-user-circle"></i>
        </button>
        <div className="nav__a dropdown__content">
          <Link className="nav__a dropdown__button" href="#" to="/home">Home</Link>
          <Link className="nav__a dropdown__button" href="#" to="/current-week">Current week</Link>
          <Link className="nav__a dropdown__button" href="#" to="/create-menu">Create Menu</Link>
          <a className="nav__a dropdown__button" href="#" onClick={onLogout}>Logout</a>
        </div>
      </div>  
    </nav>
  </header>
    {user && <section className="user-panel">
      <h1 className="user-panel__title">User panel</h1>
      <h2 className="user-panel__info">Name: {user.name}</h2>
      <h2 className="user-panel__info">Surname: {user.surname}</h2>
      <h2 className="user-panel__info">E-mail: {user.email}</h2>
    </section>}
  </section>
})