import React, {  useContext, useEffect } from 'react'
import { withRouter, Link } from "react-router-dom"
import Context from '../Context'
import logic from '../../logic'


function Header(props) {

  const { history } = props
  const { user, setUser } = useContext(Context)
    
  useEffect(() => {
    (async () => {
                    
      const user = await logic.retrieveUser()
      setUser(user)
            
        
    })()
}, [])

  function handleLogout(){
      logic.logUserOut()
      history.push('/')
  }


  return (
    
      <div>
        <nav>
          <ul>
            Hola, {user && user.name}!
            <li>
              <Link to="/">My Leagues</Link>
            </li>
            <li>
              <Link to="/mylineup/">My line up</Link>
            </li>
            <li>
              <Link to="/myteam/">My Team</Link>
            </li>
            <li>
              <Link to="/leaguetable/">League table</Link>
            </li>
            <li>
              <Link to="/profile/">Profile</Link>
            </li>
            
            <a href="#" onClick={event => {
            event.preventDefault()
            handleLogout()
             }}>Logout</a>
            
         
          </ul>
        </nav>
        
       
      </div>

  )

}
export default withRouter(Header)