import React, { useContext } from 'react'
import Context from '../Context'
import logic from '../../logic'
import logo from '../../images/logo-dctm.png'
import logoheader from '../../images/logo-header.png'
import logout from '../../images/ic-logout.png'
import back from '../../images/ic-back.png'
import { withRouter } from 'react-router-dom'
import './index.sass'


export default withRouter(function ({ history, onLogout }) {

    const { user } = useContext(Context)

    const handleLogout = () => {
        logic.logUserOut()
    
        history.push('/login')
      }


    const handleGoBack = (event) => {
        event.preventDefault()

        history.push('/landingtwo')
    }

    return <>
    <header className="header-wrapper">
        {<nav className="nav-container">
                    {user && user.userRole !== "admin" ? <div className="menu citizen-menu">
                        <div className="wrapper-image"><img className="header-image"src={logoheader}/></div>
                        <ul className="button-set">
                            <li className="button-set__element"><a href="" onClick={handleGoBack} ><img className="managerimg" src={back} /></a></li>
                            <li className="button-set__element"><a href="" onClick={handleLogout}><img className="managerimg" src={logout} /></a></li>
                        </ul>
                    </div> : <div  className="menu manager-menu">
                    <div className="wrapper-image"><p className="user-name">Hello, {user && user.fullname}</p></div>
                        <ul className="button-set">
                            <li className="button-set__element"><a href="" onClick={handleGoBack} ><img className="managerimg" src={back} /></a></li>
                            <li className="button-set__element"><a href="" onClick={handleLogout}><img className="managerimg" src={logout} /></a></li>
                        </ul>
                    </div>}
                </nav>}
    </header>
    </>
})

// on admin login --> maintain name on header?


{/* <select className="select" onChange={event=>{
        event.preventDefault()
        value1=event.target.value
        
     }}>
           <option>Select a category</option>
           <option value="T-shirt">T-shirts</option>
           <option value="Nocilla">Nocilla</option>
           <option value="Duck">Duck</option>
           <option value="Pig">Pig</option>
           <option value="Full equip">team</option>
           <option value="mug">Mugs</option>
           <option value="Frame">Frames</option>
       </select> */}