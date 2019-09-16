import React, {  useState, useEffect } from 'react'
import { withRouter, Link } from "react-router-dom"
import Context from '../Context'
import logic from '../../logic'


function Header(props) {

  const { history } = props
  const [user, setUser] = useState(null)
  const [code, setCode] = useState(null)
    
  useEffect(() => {
    
    (async () => {
      try {    
          const user = await logic.retrieveUser()
          setUser(user)
      }
      catch({message}) {
        console.log('fail login', message)
      } 
      debugger
      try {  
        debugger  
          const {code} = await logic.retrieveLeague(sessionStorage.league, sessionStorage.team)
          setCode(code)
        
      }
      catch({message}) {
        console.log('fail login', message)
      }   

        
    })()
}, [])

  function handleLogout(){
      logic.logUserOut()
      history.push('/')
  }

return (
  <div>
  
        <div className="header">
          <div id="menuToggle">
          <input type="checkbox" />
        
          <span></span>
          <span></span>
          <span></span>
        
              <ul className="menu">
            
              
                <li className="menu__profile">
                  <Link to="/profile/">Profile</Link>
                </li>
                <li>
                {code &&  <p>Code of the league: {code}</p>}
                </li>
                <a className="menu__logout" href="#" onClick={event => {
                event.preventDefault()
                handleLogout()
                }}>Logout</a>
                
                </ul>
            </div>
          {/* </nav>   */}
              
          
          <div className="title">    

              <h2 className="title__name">FOOTCAMP FANTASY</h2>
              <div className="menu-title__big"></div>
              {user && <p className="title__user">{user.name}</p>} 
          </div> 
          
        </div>

            
              <ul className="low-menu">
                <li className="low-menu__items">
                  <Link to="/"><i class="fas fa-futbol fa-2x"></i></Link>
                </li>
                <li className="low-menu__items">
                  <Link to="/mylineup/"><i class="far fa-thumbs-up fa-2x"></i></Link>
                </li>
                <li className="low-menu__items">
                  <Link to="/myteam/"><i class="fas fa-users fa-2x"></i></Link>
                </li>
                <li className="low-menu__items">
                  <Link to="/leaguetable/"><i class="fas fa-table fa-2x"></i></Link>
                </li>
              </ul>
        
        
</div>


    
//       // <div>
//       //   <nav>
//       //     <ul>
//       //       Hola, {user && user.name}!
//       //       <li>
//       //         <Link to="/">My Leagues</Link>
//       //       </li>
//       //       <li>
//       //         <Link to="/mylineup/">My line up</Link>
//       //       </li>
//       //       <li>
//       //         <Link to="/myteam/">My Team</Link>
//       //       </li>
//       //       <li>
//       //         <Link to="/leaguetable/">League table</Link>
//       //       </li>
//       //       <li>
//       //         <Link to="/profile/">Profile</Link>
//       //       </li>
            
//       //       <a href="#" onClick={event => {
//       //       event.preventDefault()
//       //       handleLogout()
//       //        }}>Logout</a>
            
         
//       //     </ul>
//       //   </nav>
        
       
//       // </div>

  )

}
export default withRouter(Header)

