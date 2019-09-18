import React from 'react'
import logo from '../../style/img/logo-white.png'


function InitialHeader() {


  return (
    
      <div className="initial-header">
       
       
        <img className="initial-header__image" src={logo} />
        <h1 className="initial-header__text">FANTASY FOOTBALL FOOTCAMP</h1>
       
      </div>

  )

}
export default (InitialHeader)