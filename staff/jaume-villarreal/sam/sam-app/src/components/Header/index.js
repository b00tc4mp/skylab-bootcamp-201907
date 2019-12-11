import React , { useContext } from 'react'
import MyContext from '../ProviderContext'
import logic from '../../logic'

import orangeLogo from '../../styles/img/logo-orange-50.png'
// import blueLogo from '../../styles/img/logo-medium-blue-50.png'

import "./index.sass"

function Header(){
    const { tutor , setTutor } = useContext(MyContext)

    function handleLogout(){
        setTutor(undefined)
        logic.userLoggedOut()
    }

    return  <div className="header">
                <div className="header__logo">
                    <img className="logo" src={orangeLogo} alt="logo SAM"/>
                    <div className="legend">
                        <p className="legend__brand">sam</p>
                        <p className="legend__sub-brand">summer activity manager</p>
                    </div>
                </div>
                {tutor &&   <div className="header__user">
                                <p className="user-name">{tutor.name} {tutor.surname}</p>
                                <button className="btn btn--logout" onClick={handleLogout}></button>
                            </div>}
            </div>
}

export default Header