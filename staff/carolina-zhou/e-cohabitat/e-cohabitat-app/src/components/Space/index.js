import React, { useContext, useEffect, useState } from 'react'
import Context from '../context'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

function Space({ history, match }) {
    

    const { params: { spaceId } } = match
    const [ view, setView ] = useState(false)
    const { mySpace, setMySpace, setThisDay, setCurrentDate } = useContext(Context)
    

    useEffect(() => {
        (async () =>{
            
            try {
                const mySpace = await logic.retrieveSpace(spaceId)  
                setMySpace(mySpace)

            } catch(error) {
                console.log(error.message)
            }
            })()
    })


    function handleMonth(event) {
        event.preventDefault()

        setCurrentDate(moment())
        history.push(`/${spaceId}/month`)
    }


    function handleDay(event) {
        event.preventDefault()

        setThisDay(moment())
        history.push(`/${spaceId}/day`)
    }

    
    function showCousers(event) {
        event.preventDefault()

        setView(true)
    }


    function handleClose(event) {
        event.preventDefault()

        setView(false)
    }


    function handleAdd(event) {
        event.preventDefault()

        history.push(`/${spaceId}/couser-register`)
    }


    return <>

    { mySpace && 
        <div className="module">
           
            <h1 className="module__title">{mySpace.title}</h1>
            <p className="module__type">Type: {mySpace.type}</p>
            <p className="module__address">{mySpace.address}</p>
            <p className="module__users">{mySpace.cousers.length} user/s</p>
            <p className="module__users-link" onClick={showCousers}>(<i className="far fa-eye"></i> who?)</p>

            {view && 
            <div className="module__users-list">
                <h2 className="module__users-list-title">Users</h2>
                {mySpace.cousers.map(user => {
                return <><p className="module__user-name">{user.username} / {user.name} {user.surname}</p></>
                })}
                <button className="module__add-users" onClick={handleAdd}>+ add companions!</button>
                <button className="module__close" onClick={handleClose}>close</button>
            </div>
            }

            <figure className="module__figure">
                <img className="module__img" alt="kitchen" src={mySpace.picture}/>
            </figure>     
             

            <div className="module__form">
                <button className="module__calendar" onClick={handleMonth}>General calendar</button>
                <button className="module__today" onClick={handleDay}>What's up today?</button>
                <a href="#" className="module__back-link" onClick={() => { history.push('/home') }}><i className="fas fa-arrow-left"></i> Back to your spaces</a>
            </div>
        </div>
    }

    {!mySpace && <p>Space not found</p>}

    </>
}

export default withRouter(Space)