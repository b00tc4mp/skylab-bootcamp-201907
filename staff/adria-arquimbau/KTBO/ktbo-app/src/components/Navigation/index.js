/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect, useContext} from 'react'
import Search from '../Search'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'
import Context from '../Context'

function Navigation({ history, onSearch }) {

    const [admin, setAdmin] = useState()
    const {user} = useContext(Context)

    useEffect(() => {
        handleAdmin()
    },[])
    
    function handleHome() {
        history.push('/home')
    }
    
    /* function handleDocuments() {
        history.push('/home/documents')
    } */

    function handleCategories() {
        history.push('/home/categories')
    }

    function handleMyOrders() {
        history.push('/home/my-orders')
    }

    function handleCurrentOrder() {
        history.push('/home/current-order')
    }

    function handleMyAccount() {
        history.push('/home/my-account')
    }

    function handleAdminPanel() {
        history.push('/home/admin-panel')
    }

    function handleLogout (){
        delete sessionStorage.id
        delete sessionStorage.token
    }
    
    async function handleAdmin() {
        try {
            const res = await logic.isUserAdmin()
            if(res === true) setAdmin(res)
        } catch (error) {
            //TODO
        }
      }

    return <>
 
        <section className="navigation">
            <ul className="navigation__ul sticky">
                <li className="navigation__li"><a className="navigation__li--anchor" href="#" onClick={event => { event.preventDefault() 
                    handleHome() }}>Home</a></li>
                {/* <li className="navigation__li"><a href="#" onClick={event => { event.preventDefault() 
                    handleDocuments() }}>Documents</a></li> */}
                <li className="navigation__li"><Search onSearch={onSearch} /></li>
                <li className="navigation__li"><a className="navigation__li--anchor" href="#" onClick={event => { event.preventDefault() 
                    handleCategories() }}>Categories</a></li>
                <li className="navigation__li"><a className="navigation__li--anchor" href="#" onClick={event => { event.preventDefault() 
                    handleMyOrders() }}>My Orders</a></li>
                <li className="navigation__li"><a className="navigation__li--anchor" href="#" onClick={event => { event.preventDefault() 
                    handleCurrentOrder() }}>Current Order</a></li>
                {user &&<div className="dropdown">
                    <button className="dropbtn" >Hello, {user.company}<i className="fa fa-caret-down"></i></button>
                    <div className="dropdown-content">
                        <a className="navigation__li--anchor" href="#" onClick={event => { event.preventDefault() 
                                handleMyAccount() }}>My Account</a>
                        {admin && <a className="navigation__li--anchor" href="#" onClick={event => { event.preventDefault() 
                                handleAdminPanel() }}>Admin Panel</a>}
                        <a className="navigation__li--anchor" href="" onClick={handleLogout}>Logout</a>
                    </div>
                </div>}
            </ul>  
        </section>
    </>
}

export default withRouter(Navigation)