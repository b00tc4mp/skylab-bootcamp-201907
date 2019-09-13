import React, { useContext, useState } from 'react'
import Context from '../context'
import logic from '../../logic/'
import { withRouter } from 'react-router-dom'

function Chores() {

    let [chores, setChores] = useState()
    const [tags, setTags] = useState()
    const { mySpace } = useContext(Context)

debugger
    function handleMaintenance(event) {
        event.preventDefault()

        const { target: { maintenance: { value: maintenance } } } = event

        let chores = mySpace.maintenance
        setChores(chores)

        chores.push(maintenance)

        /* addMaintenance(spaceId, maintenance) */
    }


    /* async function addMaintenance(spaceId, maintenance) {

        try {
            const addedMaintenance = await logic.updateSpace(spaceId, { maintenance: [maintenance] })

            let chores = addedMaintenance.maintenance
            setChores(chores)
        } catch(error) {
            console.log(error.message)
        }
    } */

debugger
    function handleTags(event) {
        event.preventDefault()

        const { target: { tag: { value: tag } } } = event

        let tags = mySpace.tags
        setTags(tags)
        
        tags.push(tag)
        /* addTag(spaceId, tag) */
    }


    /* async function addTag(spaceId, tag) {

        try {
            const addedTag = await logic.updateSpace(spaceId, { tag: [tag] })

            let tags = addedTag.tags
            setTags(tags)
        } catch(error) {
            console.log(error.message)
        }
    } */

    return <>
        <div className="chores__activity">
            <div className="chores__maintenance">
                <p className="chores__list-title"><strong>Maintenance</strong></p>
                {chores &&
                <ul className="chores__list">
                    {chores.map(chore => {
                    return <>    
                        <li className="chores__item"><i className="fas fa-list-ul"></i> {chore}</li>
                    </>
                    }
                    )}
                </ul>
                }
                <form onSubmit={handleMaintenance}>
                    <ul className="chores__add">
                        <li>
                            <button className="fas fa-plus"></button>
                        </li>
                        <li>
                            <label for='maintenanceChore'>
                                <input className="chores__input" id='maintenanceChore' type='text' name='maintenance' placeholder='add chore' />
                            </label>
                        </li>
                    </ul>
                </form>
            </div>
            <div className="chores__tags">
                <p className="chores__list-title"><strong>Activity Tags</strong></p>
                {tags &&
                <ul className="chores__list">
                    {tags.map(tag => {
                    return <>    
                        <li className="chores__item"><i className="fas fa-tag"></i>  {tag}</li>
                    </>
                    }
                    )}
                </ul>
                }
                <form onSubmit={handleTags}>
                    <ul className="chores__add">
                        <li>
                            <button className="fas fa-plus"></button>
                        </li>
                        <li>
                            <label for='activityTag'>
                                <input className="chores__input" id='activityTag' type='text' name='tag' placeholder='add tag' />
                            </label>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    </>
}

export default withRouter(Chores)