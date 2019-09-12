/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import Context from '../Context'
import logic from '../../logic'
import { Redirect} from "react-router-dom"
import { setUseProxies } from 'immer'



function User() {
    
    const { setView, setCredentials, view,setUser } = useContext(Context)
 
    return <>
            {view==="redirectLanding" && <Redirect to="/landing"/>}

        <h2 className="formPanel">User</h2>
        <nav>
        <ul >
            <li ><a className="nav-but" href='/#/profile/user-orders'> View orders</a></li>
            <li ><a className="nav-but" href='/#/profile/user-update'> Update profile</a></li>
            <li ><a className="nav-but" onClick={event => {
                event.preventDefault()  
                setCredentials(undefined)
                setView("redirectLanding")
                setUser(undefined)
                sessionStorage.clear()
                //setUser()
                console.log("no credentials")
            }}> Log out</a></li>
             <li ><a className="nav-but" href='/#/profile/user-remove' > Remove profile</a></li>

        </ul> 
        </nav>
        
    </>
}

export default User