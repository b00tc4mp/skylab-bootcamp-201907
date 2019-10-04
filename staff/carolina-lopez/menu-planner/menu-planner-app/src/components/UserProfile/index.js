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
 <header className="navbar">
  <div className="dropdown dropdown-left">
    <button className="dropbtn">MenuPlanner 
      <i className="fa fa-caret-down"></i>
    </button>
    <div className="dropdown-content">
      <Link className="nav__a dropdown__button a" href="#" to="/home">Home</Link>
      <Link className="nav__a dropdown__button a" href="#" to="/current-week">Current Week</Link>
      <Link className="nav__a dropdown__button a" href="#" to="/create-menu">Create Menu</Link>
    </div>
  </div> 
  <div className="dropdown dropdown-right">
    <button className="dropbtn"><i className="far fa-user-circle"></i>
    </button>
    <div className="dropdown-content">
      <a className="nav__a dropdown__button a"href="#" onClick={onLogout}>Logout</a>
    </div>
  </div>
</header>
    {user && <section className="user-panel">
      <h1 className="user-panel__title">User panel</h1>
      <h2 className="user-panel__info">Name: {user.name}</h2>
      <h2 className="user-panel__info">Surname: {user.surname}</h2>
      <h2 className="user-panel__info">E-mail: {user.email}</h2>
    </section>}
  </section>
})