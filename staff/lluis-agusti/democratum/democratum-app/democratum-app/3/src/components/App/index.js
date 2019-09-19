import React, { useState, useEffect } from 'react'
//import './index.sass'
import '../../style/index.css'
import Context from '../Context'
import Register from '../Register'
import Login from '../Login'
import Allcity from '../Allcity'
import Allapproved from '../Allapproved'
import Allexpired from '../Allexpired'
import Allrejected from '../Allrejected'
import Allpending from '../Allpending'
import Singlepoll from '../Singlepoll'
import Newpoll from '../Newpoll'
import Changestatus from '../Changestatus'
import Okvote from '../Okvote'
import Oknewpoll from '../Oknewpoll'
import Navbarmanager from '../Navbarmanager'
import Landingtwo from '../Landingtwo'
import Editpoll from '../Editpoll'
import Alreadyvoted from '../Alreadyvoted'
import Navbarmanagerlanding from '../Navbarmanagerlanding'
import Okstatus from '../Okstatus'
import Failstatus from '../Failstatus'

import logic from '../../logic'
import { Route, Link, withRouter } from 'react-router-dom'
import Home from '../Home'

function App({ history }) {

  const [user, setUser] = useState()

  const [voteRes, setVoteRes] = useState(undefined)

  const [error, setError] = useState(null)

/*   useEffect(() => {
    async function _retrieveUser(){
        const user = await logic.retrieveUser()

        setUser(user)
    }
    _retrieveUser()
  }, [])
 */
  const handleBack = () => {

    history.push('/landingtwo')
  }

  const handleRegister = async (cityId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole) => {
    try {
      await logic.registerUser(cityId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole)

      history.push('/login')
    } catch ({message}) {
      setError(message)
  }
  }

  async function handleNewPoll (cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus){
    try {
      await logic.newPoll(cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)

      history.push('/oknewpoll')
    } catch ({message}) {
      setError(message)
  }
  }

  const handleLogin = async (email, password) => {
    try {
      await logic.authenticateUser(email, password)
      history.push('/landingtwo')
    } catch ({ message }) {
      console.log('fail login', message)
    }
  }

  const handleLogout = () => {
    logic.logUserOut()

    history.push('/login')
  }



  return <div className="App" >
    <Context.Provider value={{ user, setUser, voteRes, setVoteRes }} > 

        <Route exact path="/" render={() => logic.isUserLoggedIn() ? history.push('/landingtwo') : <Login />} />
        <Route path="/register" render={() => <Register onBack={handleBack} onRegister={handleRegister} />} />
        <Route path="/login" render={() => <Login onBack={handleBack} onLogin= {handleLogin} />} />
        {logic.isUserLoggedIn() && <Route path="/landingtwo" render={() => <Landingtwo onLogout={handleLogout}/>} />}
        {logic.isUserLoggedIn() && <Route path="/home" render={() => <Home onLogout={handleLogout}/>} />}
        {logic.isUserLoggedIn() && <Route path="/allcity" render={() => <Allcity onLogout={handleLogout}/>} />}
        {logic.isUserLoggedIn() && <Route path="/approved" render={() => <Allapproved onLogout={handleLogout}/>} />}
        {logic.isUserLoggedIn() && <Route path="/expired" render={() => <Allexpired onLogout={handleLogout}/>} />}
        {logic.isUserLoggedIn() && <Route path="/pending" render={() => <Allpending onLogout={handleLogout}/>} />}
        {logic.isUserLoggedIn() && <Route path="/rejected" render={() => <Allrejected onLogout={handleLogout}/>} />}
        {logic.isUserLoggedIn() && <Route path="/singlepoll/:pollId" render={() => <Singlepoll onLogout={handleLogout}/>} />}
        <Route path="/newpoll" render={() => <Newpoll onLogout={handleLogout} onNewPoll={handleNewPoll} />} />
        {logic.isUserLoggedIn() && <Route path="/editpoll" render={() => <Editpoll onLogout={handleLogout} onBack={handleBack} />} />}
        <Route path="/oknewpoll" render={() => <Oknewpoll onBack={handleBack} onLogout={handleLogout} />} />
        <Route path="/okstatus" render={() => <Okstatus onBack={handleBack} onLogout={handleLogout} />} />
        <Route path="/failstatus" render={() => <Failstatus onLogout={handleLogout} onBack={handleBack} />} />
        <Route path="/okvote" render={() => <Okvote onLogout={handleLogout} onBack={handleBack} />} />
        <Route path="/alreadyvoted" render={() => <Alreadyvoted onLogout={handleLogout} onBack={handleBack} />} />
        <Route path="/navbarmanager" render={() => <Navbarmanager onLogout={handleLogout} onBack={handleBack} />} />
        <Route path="/navbarmanagerlanding" render={() => <Navbarmanagerlanding onLogout={handleLogout} onBack={handleBack} />} />
        {logic.isUserLoggedIn() && <Route path="/changestatus" render={() => <Changestatus onLogout={handleLogout}/>} />}


    </Context.Provider>
  </div>

}

// {logic.isUserLoggedIn() && <Route path="/user/retrieve" render={() => <Retrieve onLogout={handleLogout}/>} />}
// {logic.isUserLoggedIn() && <Route path="/singlepoll/:pollId" render={() => <Singlepoll onLogout={handleLogout}/>} />}

export default withRouter(App)