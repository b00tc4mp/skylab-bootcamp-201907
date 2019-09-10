import React from 'react'

export default function({ onBack, onLogin }) {
    return <>
    <main class="main"> 
        <img src={require('../../img/logo.svg')} alt="e-cohabitat project logo" class="main__logo"/>

        <h1 class="main__title"><span class="main__e">e-</span>cohabitat</h1>
        <h2 class="main__subtitle">Sharing spaces, building communities</h2>

        <nav class="main__mobile-menu">
            <ul>
                <li class="main__item"><a class="main__link" href={`/#/sign-up`} title="Sign up">Sign up</a></li>
                <li class="main__item"><a class="main__link" href={`/#/sign-in`} title="Sign in">Sign in</a></li>
            </ul>
        </nav>
    </main>
    </>
}