import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { withRouter, Route, Redirect } from 'react-router-dom'

import Nav from "../Nav"
import Footer from "../Footer"

function Message ({ history }) {
    const [myAds, setMyAds] = useState()



  function handleDelete () {

    if (logic.isUserLoggedIn()){

         onDelete()
    }
    else{
        history.push('/auth')
    }
   
  }

  async function onDelete(){
    try{
         await logic.delete(id)
         console.log("corectly add")


    }catch(error){
        console.log(error.message)

    }
}
    useEffect(() => {
        (async () => {
            try{
                const ads = await logic.retrieveUserAd()
                
                setMyAds(_myAds)
            }catch(error){
                console.log(error.message)
            }
         
        })()
    }, [])

    return <>
    
    <Nav/>
     <ul>
      
      {myAds && myAds.length && myAds.map(item => <li key={item._id}>
        <img src={ad.image}></img>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>{item.price}</p>
            <p>{item.location}</p>  
            <button onClick={() => handleDelete(item._id)}>aaaa</button>
                               
                            
        </li>)}
    </ul>
    <Footer/>

    </>
}
export default withRouter(Message)