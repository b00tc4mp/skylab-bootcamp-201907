import React, { useContext, useEffect } from 'react'
import Context from '../context'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'

debugger
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
    <main className="main">
    { mySpace && <> 
        <div className="module">
           
            <h1 className="module__title">{mySpace.title}</h1>
            <p className="module__type">Type: {mySpace.type}</p>
            <p className="module__address">{mySpace.address}</p>
            <p className="module__users">{mySpace.cousers.length} user/s</p>
            <a className="module__users-link" href=""><i className="far fa-eye"></i> who?</a>
                    
            <figure className="module__figure">
                <img className="module__img" alt="kitchen image" src={mySpace.picture}/>
            </figure>     
             

            <div className="module__form">
                <button className="module__calendar" onClick={handleMonth}>General calendar</button>
                <button className="module__today" onClick={handleDay}>What's up today?</button>
                <a href={`/home`} className="module__back-link"><i className="fas fa-arrow-left"></i> Back to your spaces</a>
            </div>
        </div>
    </>}
    {!mySpace && <p>Space not found</p>}
    </main>
    </>
}

export default withRouter(Space)