/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'

import Context from './Context'
import Landing from './Landing'
import Register from './Register'
import Login from './Login'
import RegisterSuccess from './Register-success'
import Cart from './Cart'
import Admin from './Admin'
import AdvancedSearch from './Advanced-search'
import Products from './Products'
import AdminRegisterProduct from './Admin-register-product'
import ProductDetail from './Product-detail'
import ProductsCategory from './Products-category'
import ShowAllOrders from './Admin-view-orders'
import AdminUpdate from './Admin-update'
import Spinner from './Spinner'
import User from './User'
import UserUpdate from './User-update'
import ShowAllOrdersUser from './User-orders'
import UserRemove from './User-remove'
import SumButton from './SumButton'
import UserCart from './User-cart'


import { withRouter, Route } from 'react-router-dom'

import './App.sass'

function App() {

  const [view, setView] = useState('')
  const [credentials, setCredentials] = useState(undefined)
  const [user, setUser] = useState(undefined)
  const[admin,setAdmin] =useState('')
  const[advancedSearch,setAdvancedSearch]=useState(false)
  const[products,setProducts]=useState(undefined)
  const[product,setProduct]=useState(undefined)
  const[productQuery,setProductQuery]=useState(undefined)
  const[spinner,setSpinner]=useState(false)
  const[orders,setOrders]=useState(undefined)
  const[cart,setCart]=useState(undefined) 

 
  return(
  <div className="App">
    <Context.Provider value={{ view, setView, credentials, setCredentials, user, setUser, admin,setAdmin, 
      advancedSearch, setAdvancedSearch, products,setProducts,
       product,setProduct, productQuery,setProductQuery, spinner,setSpinner, orders,setOrders, cart,setCart }} >

      <Route path="/" render={() => <Landing /> } />
      {advancedSearch && < Route path="/" render={() => <AdvancedSearch /> } />}

      <Route path="/register" render={() => <Register /> } />
      <Route path="/login" render={() => <Login /> } />
      <Route path="/registersuccess" render={() => <RegisterSuccess /> } />
      <Route exact path="/" render={() => <Products /> } />
      <Route exact path="/productDetail" render={() => <ProductDetail /> } />
      <Route path="/cart" render={() => <Cart /> } />
      <Route path="/productsCategory" render={() => <ProductsCategory /> } />
      <Route path="/spinner" render={() => <Spinner /> } />
      <Route exact path="/admin" render={() => <Admin /> } />
      <Route path="/admin/admin-update" render={() => <AdminUpdate /> } />
      <Route path="/admin/register-products" render={() => <AdminRegisterProduct /> } />
      <Route path="/admin/view-orders" render={() => <ShowAllOrders /> } />
      <Route exact path="/profile" render={() => <User /> } />
      <Route path="/profile/user-update" render={() => <UserUpdate /> } />
      <Route path="/profile/user-orders" render={() => <ShowAllOrdersUser /> } />
      <Route path="/profile/user-remove" render={() => <UserRemove /> } />
      <Route path="/sum" render={() => <SumButton /> } />
      <Route path="/user-cart" render={() => <UserCart /> } />




    </Context.Provider>
    </div>)
}

export default withRouter(App);