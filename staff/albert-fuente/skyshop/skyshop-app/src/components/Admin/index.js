/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import Context from '../Context'
import logic from '../../logic'
import { Redirect} from "react-router-dom"



function Admin() {
    
    const { setView,view,setCredentials,admin,setUser,setAdmin } = useContext(Context)

    function handleGoRegisterProduct(event){
        event.preventDefault()
        setView("registerProducts")
        console.log("got to register product")
    }
 
    return <>
        {view==="redirectLanding" && <Redirect to="/landing"/>}

        <h2 className="formPanel">Admin</h2>
        {admin===true &&
        <nav>
        <ul >
            <li ><a className="nav-but" href='/#/admin/register-products'> Register products</a></li>
            <li ><a className="nav-but" href='/#/admin/update-product'> Update product</a></li>
            <li ><a className="nav-but" href='/#/admin/remove-product'> Remove product</a></li>
            <li ><a className="nav-but" href='/#/admin/stock'> Stock control</a></li>
            <li ><a className="nav-but" href='/#/admin/view-orders'> View orders</a></li>
            <li ><a className="nav-but" onClick={event => {
                event.preventDefault()  
                setCredentials(undefined)
                setView("redirectLanding")
                setUser(undefined)
                setAdmin("")
                sessionStorage.clear()
                //setUser()
                console.log("no credentials")
            }}> Log out</a></li>
           


        </ul> 
        </nav>}
        
    </>
}

export default Admin