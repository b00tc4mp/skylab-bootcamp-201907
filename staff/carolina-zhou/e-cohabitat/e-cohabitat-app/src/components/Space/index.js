import React from 'react'
import { withRouter } from 'react-router-dom'

function Space({ history }) {

    function handleMonth(event) {
        event.preventDefault()

        history.push('/month')
    }

    function handleDay(event) {
        event.preventDefault()

        history.push('/day')
    }

    return <>
    <main class="main"> 
        <div class="module">
            <h1 class="module__title">Kitchen</h1>
            <p class="module__address">Building Z, 2nd floor</p>
            <p class="module__users">20 users </p>
            <a class="module__users-link" href=""><i class="far fa-eye"></i> who?</a>
                    
            <figure class="module__figure">
                <img class="module__img" alt="kitchen image" src={require('../../img/space-a.jpg')}/>
            </figure>          

            <form class="module__form">
                <button class="module__calendar" onClick={handleMonth}>General calendar</button>
                <button class="module__week" onClick={handleDay}>What's up today?</button>
            </form>
        </div>
    </main>
    </>
}

export default withRouter(Space)