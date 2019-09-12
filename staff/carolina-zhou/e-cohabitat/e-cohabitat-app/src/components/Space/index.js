import React, { useContext, useEffect } from 'react'
import Context from '../context'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'


function Space({ history }) {
    
    const { spaceId, mySpace, setMySpace } = useContext(Context)
    
    useEffect(() => {
        (async () =>{
            
            try {
                const mySpace = await logic.retrieveSpace(spaceId)
                
                setMySpace(mySpace)
            } catch(error) {
                console.log(error.message)
            }
            })()
    },[])

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
    { mySpace && <> 
        <div class="module">
           
            <h1 class="module__title">{mySpace.title}</h1>
            <p class="module__type">Type: {mySpace.type}</p>
            <p class="module__address">{mySpace.address}</p>
            <p class="module__users">{mySpace.cousers.length} user/s</p>
            <a class="module__users-link" href=""><i class="far fa-eye"></i> who?</a>
                    
            <figure class="module__figure">
                <img class="module__img" alt="kitchen image" src={mySpace.picture}/>
            </figure>     
             

            <div class="module__form">
                <button class="module__calendar" onClick={handleMonth}>General calendar</button>
                <button class="module__today" onClick={handleDay}>What's up today?</button>
                <a href={`/home`} class="module__back-link"><i class="fas fa-arrow-left"></i> Back to your spaces</a>
            </div>
        </div>
    </>}
    {!mySpace && <p>Space not found</p>}
    </main>
    </>
}

export default withRouter(Space)