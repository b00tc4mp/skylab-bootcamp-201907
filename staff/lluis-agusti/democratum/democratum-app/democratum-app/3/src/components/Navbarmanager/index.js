import React, { useContext } from 'react'
import Context from '../Context'
import logic from '../../logic'
import logo from '../../images/logo-dctm.png'
import { withRouter } from 'react-router-dom'
import './index.sass'
import app from '../../images/ic-approved.png'
import rej from '../../images/ic-rejected.png'
import exp from '../../images/ic-expired.png'
import pen from '../../images/ic-pending.png'
import edit from '../../images/ic-edit.png'


export default withRouter(function ({ history, onLogout }) {

    const { user } = useContext(Context)

    return <>
    <header className="header-wrapper-manager">
        {<nav className="nav-container-manager">
                    <ul className="menu menumanagerul">
                        <li className="element-manager-li"><a href="" className="managerimg" onClick={event => {
            event.preventDefault()

            history.push('/pending')
        }}><img alt="pendingpolls" src={pen}/></a></li>
                        <li className="element-manager-li"><a href="" className="managerimg" onClick={event => {
            event.preventDefault()

            history.push('/approved')
        }}><img alt="approvedpolls" src={app}/></a></li>
                        <li className="element-manager-li"><a href="" className="managerimg" onClick={event => {
            event.preventDefault()

            history.push('/rejected')
        }}><img alt="rejectedpolls" src={rej}/></a></li>
                        <li className="element-manager-li"><a href="" className="managerimg" onClick={event => {
            event.preventDefault()

            history.push('/expired')
        }}><img alt="expiredpolls" src={exp}/></a></li>
                    </ul>
        </nav>}
        </header>
    </>
})