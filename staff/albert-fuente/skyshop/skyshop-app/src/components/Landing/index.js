/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect } from 'react'
import Context from '../Context'
import logic from '../../logic'
import { Redirect} from "react-router-dom"


import '../App.sass'

export default function Landing(){

    const { credentials, view, setView, user, setUser, admin,setAdmin , advancedSearch, setAdvancedSearch,product, setProduct, productQuery,setProductQuery, cart,setCart} = useContext(Context)

    useEffect(() => {

        if (credentials) {
          const { id, token } = credentials

          async function retrieve() {
            try {
              const { user: userRetrieved } = await logic.retrieveUser(id, token)

              setUser(userRetrieved)
              
              setAdmin(userRetrieved.isAdmin)  
              setCart(userRetrieved.cart.length)         
              console.log('is admin?'+userRetrieved.isAdmin)
            } catch(error) {
              console.log(error.message)
              
            }
          }
          retrieve()

        }
    }, [credentials])


    function handleGoAdvancedSearch(event){
      event.preventDefault() 
      setAdvancedSearch(!advancedSearch)
    }


    return <>
    <header>
    {view==="landing" && <Redirect to="/"/>}
    {view==="productCategory" && <Redirect to="/productsCategory"/>}
    {admin===true && <Redirect to="/admin"/>}
    {admin===true &&
        <nav className="nav">
        <ul className="ul">
            <li><img className="fav-logo-bco" src={require("../../styles/img/logo-bco.png")}></img> </li>
            <li className="li--title"><a className="nav-title" onClick={event=>{
                event.preventDefault()
                setView('landing')
            }}>Skyshop</a></li>
            <li className="li">{user.name}</li>
            <li className="li--small"><a href='/#/admin'  className="nav-but"  > <i class="fas fa-home"></i></a></li>
        </ul> 
</nav>
        }
    {user && admin===false &&
        <nav className="nav">
        <ul className="ul">
            <li><img className="fav-logo-bco" src={require("../../styles/img/logo-bco.png")}></img> </li>
            <li className="li--title"><a className="nav-title" onClick={event=>{
                event.preventDefault()
                setView('landing')
            }}>Skyshop</a></li>
            <li className="li">{user.name}</li>
            <li className="li--small"><a href='/#/profile'  className="nav-but"  > <i class="fas fa-home"></i></a></li>
            <li className="li--small--cart"><a href='/#/user-cart' ><i className="fas fa-cart-plus"></i></a></li>
        </ul> 
</nav>
        }
        {!user &&
        <nav className="nav">
        <ul className="ul">
            <li><img className="fav-logo-bco" src={require("../../styles/img/logo-bco.png")}></img> </li>
            <li className="li--title"><a className="nav-title" onClick={event=>{
                event.preventDefault()
                setView('landing')
            }}>Skyshop</a></li>
            <li className="li"><a href="" className="nav-but" href='/#/register'   >Register</a></li>
            <li className="li--small"><a className="nav-but" href='/#/login' > <i className="fas fa-user"></i></a></li>
            <li className="li--small--cart"><a href='/#/cart' ><i className="fas fa-cart-plus" ></i></a></li>
        </ul> 
        </nav>
        }
        
    
    </header>
    <nav className="nav2">
            <ul className="nav2-ul">
                <li><a className="nav2-but" onClick={event => {
                event.preventDefault()
                setView("productCategory")
                setProductQuery("t-shirt")
            }} >Camisetas</a></li>
                <li><a className="nav2-but" onClick={event => {
                event.preventDefault()
                setView("productCategory")
                setProductQuery("mug")
            }}>Tazas</a></li>
                <li><a className="nav2-but" onClick={event => {
                event.preventDefault()
                setView("productCategory")
                setProductQuery("duck")
            }}>Patos</a></li>
                <li><a className="nav2-but--small"  onClick={handleGoAdvancedSearch}  ><i className="fas fa-search"></i></a></li>
            </ul>
    </nav>
    
    </>
}