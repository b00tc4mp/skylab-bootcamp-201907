import React, {  useState, useEffect } from 'react'
import { withRouter, Link } from "react-router-dom"
import logic from '../../logic'
import logo from '../../style/img/logo-white.png'


function Header(props) {

  const { history } = props
  const [user, setUser] = useState()
  const [code, setCode] = useState()
  const [error, setError] = useState()
    
  useEffect(() => {
    
    (async () => {
      try {    
          const user = await logic.retrieveUser()
          setUser(user)
      }
      catch({message}) {
       
      } 
      debugger
      try {  
        debugger  
          const {code} = await logic.retrieveLeague(sessionStorage.league, sessionStorage.team)
          setCode(code)
        
      }
      catch({message}) {
        setError(message)
      }   

        
    })()
}, [])

  function handleLogout(){
      logic.logUserOut()
      history.push('/')
  }


  function goToMain (event) {
    event.preventDefault()
    history.push('/myteam')
 }
 

return (
  <div>
      <nav className="header">

        <div className="navbar">
      
          <div className="dropdown">
            <button className="dropbtn">
            <i className="fas fa-bars"></i>
            </button>
            <div className="dropdown-content">
            <Link to="/profile/" >Profile</Link>
            <a href="#">{code &&  <p className="code">Code: {code}</p>} </a>
              <a className="menu__logout" href="#" onClick={event => {
                        event.preventDefault()
                        handleLogout()
                        }}>Logout</a>
              
            </div>
          </div>
      </div>
      
    
          <div className="title">    
          <img className="title__image" src={logo} />
            <h2 className="title__name">FOOTCAMP FANTASY</h2>
          </div>  
          <div className="title__user">
            
              {user && <p className="title__user--paragraph">{user.name} <i class="fas fa-user"></i></p>} 
           </div>              
         
      
   </nav>    
           <div>
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
        


</div>
    

  )

}
export default withRouter(Header)

