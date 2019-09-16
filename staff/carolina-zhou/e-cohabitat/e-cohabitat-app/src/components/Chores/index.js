import React, { useState, useEffect, useContext} from 'react'
import Context from '../context'
import ChoreAddition from '../Chore-addition'

function Chores() {

    const { mySpace } = useContext(Context)
    const [ chores, setChores ] = useState()

    useEffect(() => {
        (async () =>{
          try {
            const chores = await mySpace.maintenance
            setChores(chores)

          } catch(error) {
            console.log(error.message)
          }
        })()
    },[mySpace])

	const addChore = chore => {
		chores.push(chore)
		setChores([...chores])
	}

	const deleteChore = chore => {
        let result = chores.filter(item => item !== chore)
		setChores(result)
    }

    return <>
        <div className="chores__activity">
            <div className="chores__maintenance">
                <p className="chores__list-title"><strong>Maintenance</strong></p>
                {chores &&
                <ul className="chores__list">
                    {chores.map(chore => {
                    return <>    
                        <li className="chores__item">
                            <div><i className="fas fa-list-ul"></i> {chore}</div>
                            <button class="far fa-trash-alt" onClick={() => deleteChore(chore)}></button>
                        </li>
                    </>
                    }
                    )}
                </ul>
                }
                <ChoreAddition addChore={addChore} />
                {/* <form onSubmit={handleMaintenance}>
                    <ul className="chores__add">
                        <li>
                            <button className="fas fa-plus"></button>
                        </li>
                        <li>
                            <label htmlFor='maintenanceChore'>
                                <input className="chores__input" id='maintenanceChore' type='text' name='maintenance' placeholder='add chore' />
                            </label>
                        </li>
                    </ul>
                </form> */}
            </div>
            {/* <div className="chores__tags">
                <p className="chores__list-title"><strong>Activity Tags</strong></p>
                {props.tags.length > 0 &&
                <ul className="chores__list">
                    {tags.map(tag => {
                    return <>    
                        <li className="chores__item"><i className="fas fa-tag"></i>  {tag} <button class="far fa-trash-alt" onClick={() => props.deleteTag(tag.id)}></button></li>
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
                            <label htmlFor='activityTag'>
                                <input className="chores__input" id='activityTag' type='text' name='tag' placeholder='add tag' />
                            </label>
                        </li>
                    </ul>
                </form>
            </div> */}
        </div>
    </>
}

export default Chores
