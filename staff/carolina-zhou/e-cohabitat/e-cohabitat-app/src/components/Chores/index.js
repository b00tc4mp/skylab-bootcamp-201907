import React, { useState, useEffect} from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'


function Chores({ history, spaceId }) {

    const [ mySpace, setMySpace ] = useState()
    const [ chores, setChores ] = useState()

    useEffect(() => {
        (async () =>{
            try {
                const mySpace = await logic.retrieveSpace(spaceId) 
                setMySpace(mySpace) 
                
                setChores(mySpace.maintenance)
            } catch(error) {
                console.log(error.message)
            }
            })()
    },[spaceId, mySpace])

    
    function handleAdd(event) {
        event.preventDefault()

        const { target: { maintenance: { value: chore } } } = event

        addChores(chore)
    }

    async function addChores(chore) {
        chores.push(chore)
        setChores(chores)
        const newChores = { maintenance: chores }

        try {
            await logic.updateSpace(spaceId, newChores)  

        } catch(error) {
            console.log(error.message)
        }
    }

    function handleDelete(chore) {
        deleteChores(chore)
    }

    
    async function deleteChores(chore) {
        const result = chores.filter(item => item !== chore)
        const newChores = { maintenance: result }

        try {
            await logic.updateSpace(spaceId, newChores)  

            setChores(result)
        } catch(error) {
            console.log(error.message)
        }
    }

    function handleGoToSpace(event) {
        event.preventDefault()

        history.push(`/spaces/${spaceId}`)
    }

    return <>
        <div className="chores__activity">
            <div className="chores__space" onClick={handleGoToSpace}>
            {mySpace && <>
                <p className="chores__space-title">{mySpace.title}</p>
                <p className="chores__space-type">({mySpace.type})</p>
                <p className="chores__space-address">{mySpace.address}</p>
            </>}
            </div>
            <div className="chores__maintenance">
                <p className="chores__list-title"><strong>Maintenance</strong></p>
                {mySpace &&
                <ul className="chores__list">
                    {mySpace.maintenance.map(chore => {
                    return <>    
                        <li className="chores__item">
                            <div><i className="fas fa-list-ul"></i> {chore}</div>
                            <button className="far fa-trash-alt" onClick={() => handleDelete(chore)}></button>
                        </li>
                    </>
                    }
                    )}
                </ul>
                }
                <form onSubmit={handleAdd}>
                    <ul className="chores__add">
                        <li>
                            <button className="fas fa-plus"></button>
                        </li>
                        <li>
                            <label htmlFor='maintenanceChore'>
                                <input className="chores__input" id='ma zintenanceChore' type='text' name='maintenance' placeholder='add chore'/>
                            </label>
                        </li>
                    </ul>
                </form> 
            </div>
        </div>
    </>
}

export default withRouter(Chores)
