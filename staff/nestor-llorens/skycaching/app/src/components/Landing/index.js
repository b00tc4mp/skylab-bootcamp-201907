import React from 'react'
import { withRouter } from 'react-router-dom'
import treasure from '../../img/treasure.png'

function Landing({ history, setView }) {

    const handleGoToRegister = event => {
        event.preventDefault()

        history.push('/register')
        setView('register')

    }
    return (
        <main className='landing'>
            <section className='landing__section'>
                <h2 className='landing__section-h'>Join the world's largest treasure hunt!</h2>
                <p className='landing__section-p'>Track down hidden treasures in the real world and capture them for points.
                    Whether you are a casual player, an avid explorer, or a hardcore competition enthusiast,
                SkyCaching helps you rediscover the world around you.</p>

                <a className='landing__section-a' href='' onClick={handleGoToRegister}><button className='landing__section-button'>START HERE!</button></a>
                <img className='landing__section-img' src={treasure} alt="treasure image"/>
            </section>
        </main>
    )
}

export default withRouter(Landing)