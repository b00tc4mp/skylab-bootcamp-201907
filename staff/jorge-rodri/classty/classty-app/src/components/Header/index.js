import React, { useContext } from 'react'
import Context from '../Context'
import logic from '../../logic'
import { withRouter, Link } from 'react-router-dom'
/* import './Header.sass'
 */function Header({ history }) {

    const { setView, setUser } = useContext(Context)

    function handleLogaut(event) {
        event.preventDefault()

       logic.logUserOut()

        setView(undefined)
        setUser(undefined)

        history.push('/')

    }

    function handleProfile(event) {
        event.preventDefault()


        setView(undefined)
        setUser(undefined)

        history.push('/profile/1')

    }

    return <>
        <header class="header">
            <img class="logo" src="../img/icon.png"></img>
            <nav class="nav__main--position">
                <ul class="nav__list--position">
                    <li><button onClick={handleProfile}><img src="../img/profile.png" alt="P"></img></button></li>
                    <li><button onClick={handleLogaut}><img src="../img/logout.png" alt="P"></img></button></li>
                </ul>
            </nav>
        </header>
    </>
}
export default withRouter(Header)