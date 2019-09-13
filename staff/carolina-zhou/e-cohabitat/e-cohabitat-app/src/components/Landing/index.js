import React from 'react'

export default function() {
    return <>
    <main className="main"> 
        <img src={require('../../img/logo.svg')} alt="e-cohabitat project logo" className="main__logo"/>

        <h1 className="main__title"><span className="main__e">e-</span>cohabitat</h1>
        <h2 className="main__subtitle">Sharing spaces, building communities</h2>

        <nav className="main__mobile-menu">
            <ul>
                <li className="main__item"><a className="main__link" href={`/#/sign-up`} title="Sign up">Sign up</a></li>
                <li className="main__item"><a className="main__link" href={`/#/sign-in`} title="Sign in">Sign in</a></li>
            </ul>
        </nav>
    </main>
    </>
}