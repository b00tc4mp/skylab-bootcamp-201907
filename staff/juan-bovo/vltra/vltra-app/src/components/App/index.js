import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Link, Route, withRouter, Redirect } from 'react-router-dom'
import logic from '../../logic'
import Context from '../ProviderContext'
import './style.sass'

import Home from '../Home'
import Header from '../Header'
import Footer from '../Footer'
import Main from '../Main'
import Register from '../Register'
import Login from '../Login'
import RegisterSuccess from '../RegisterSuccess'
import CreatePost from '../CreatePost'
import PublishSuccess from '../PublishSuccess'
import UserProfile from '../UserProfile'
import Post from '../Post'

function App({history}) {
  const [view, setView] = useState(logic.isUserLoggedIn() ? 'home' : undefined)
  useEffect(() => {
    if (history.location.pathname === '/') setView(undefined)
  }, [history.location])
  
  return <>
    <Context.Provider value={{ view, setView }}>
      <Router>
        <Route component={Header} />
        <Route exact path="/" component={Main} />
        <Route path="/login" render={ () => !logic.isUserLoggedIn() ? <Login /> : <Redirect to="/"/> } />
        <Route path="/register" render={() => !logic.isUserLoggedIn() ? <Register/> : <Redirect to="/" />} />
        <Route path="/register-success" render={() => !logic.isUserLoggedIn() ? <RegisterSuccess/> : <Redirect to="/" />} />
        <Route path="/create-post" render={() => logic.isUserLoggedIn() ? <CreatePost/> : <Redirect to="/login" /> } />
        <Route path="/publish-success" render={() => logic.isUserLoggedIn() ? <PublishSuccess/> : <Redirect to="/login" /> } />
        <Route path="/post/:postId" render={history => <Post postId={history.match.params.postId} />} />
        <Route path="/my-profile" render={() => logic.isUserLoggedIn() ? <UserProfile /> : <Redirect to="/login" />} />
        <Footer />
      </Router>
    </Context.Provider>
  </>
}

export default withRouter(App)
