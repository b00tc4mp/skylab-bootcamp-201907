import React from 'react'

export default function(){
    return  <>
        <header>
            <h1 className = 'landing-header'>Dogs && Company</h1>
        </header>
        <main className = 'landing'>
            <nav className = 'landing_navigation'>
                <a className = 'landing_button' href = '/#/register'>Register</a>
                <a className = 'landing_button' href = '/#/login'>Log In</a>
            </nav>
        </main>
    </>
}