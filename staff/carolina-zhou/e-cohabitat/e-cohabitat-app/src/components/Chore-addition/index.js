import React, { useState } from 'react'

const ChoreAddition = props => {
    const [ chore, setChore ] = useState()

	const handleInputChange = event => {
		const { value } = event.target

        setChore(value)
	}

	return (
        <>
        <form onSubmit = { event => {
            event.preventDefault()

            props.addChore(chore)
            setChore()
        }}>
            <ul className="chores__add">
                <li>
                    <button className="fas fa-plus"></button>
                </li>
                <li>
                    <label htmlFor='maintenanceChore'>
                        <input className="chores__input" id='maintenanceChore' type='text' name='maintenance' placeholder='add chore' onChange={handleInputChange}/>
                    </label>
                </li>
            </ul>
        </form> 
        </>       
	)
}

export default ChoreAddition