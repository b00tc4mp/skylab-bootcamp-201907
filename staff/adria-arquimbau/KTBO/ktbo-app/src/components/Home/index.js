/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react'
import { withRouter, Route } from 'react-router-dom'
//import queryString from 'query-string'
import logic from '../../logic'

import Navigation from '../Navigation'
import Documents from '../Documents'
import Categories from '../Categories'
import MyOrders from '../My-orders'
import CurrentOrder from '../Current-order'
import MyAccount from '../My-account'
import Results from '../Results'
import AdminPanel from '../Admin-panel'
//import PatchNotes from './Patch-notes'

function Home({history}) {

  const [articles, setArticles] = useState()
  
  async function handleSearch(query) {
    
    if(query.length > 0){
      const articleList = await logic.searchArticles(query)
      setArticles(articleList)
      history.push(`/home/search/?q=${query}`)
    }else{
      const allArticles = await logic.retrieveAllArticles()
      setArticles(allArticles)
      history.push('/home/search/allArticles')
    }
  }   
  
    return <>
      {logic.isUserLogged() &&
        <header className="header">
          <section className="superior">
            <div className="superior__container">
            <img className="superior__image" alt="" src="https://kttape.es/wp-content/uploads/2019/02/Logo-sense-fons-dreta-blanc.png" />
            <section className="superior__conditions">
              <a className="superior__conditions--privacy"  href="https://kttape.es/privacy-policy/" >Privacy Policy</a>            
              <a className="superior__conditions--terms"  href="https://kttape.es/terms-of-use/" >Terms of Use</a>
              </section>
              </div>
          </section>
        </header>
      }
      {logic.isUserLogged() &&<div className="header__sticky-nav">
          <Navigation onSearch={handleSearch} />
        </div>
      }
        
      <main> 
            {/* <Route path="/home" render={() => !logic.isUserLogged() ? history.push('/') : <PatchNotes /> } /> */}
            <Route path="/home/documents" render={() => !logic.isUserLogged() ? history.push('/') : <Documents /> } />
            <Route path="/home/categories" render={() => !logic.isUserLogged() ? history.push('/') : <Categories /> } />
            <Route path="/home/my-orders" render={() => !logic.isUserLogged() ? history.push('/') : <MyOrders /> } />
            <Route path="/home/current-order" render={() => !logic.isUserLogged() ? history.push('/') : <CurrentOrder /> } />
            <Route path="/home/my-account" render={() => !logic.isUserLogged() ? history.push('/') : <MyAccount /> } />
            <Route path="/home/admin-panel" render={() => !logic.isUserAdmin() ? history.push('/') : <AdminPanel /> } />
            <Route path="/home/search" render={() => !logic.isUserLogged() ? history.push('/') : articles && <section><Results searchResult={articles}/></section> } />
      </main>
    </>
}

export default withRouter(Home)