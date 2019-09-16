import React from 'react'
import MapProfile from '../Map-Profile'



function Profile ({onRegisterCache }) {
    return ( <>
        <h2>Profile</h2>
        
        <form onSubmit={event => {
            event.preventDefault()

            const { target: { name: { value: name }, description: { value: description }, difficulty: { value: difficulty }, terrain: { value: terrain }, size: { value: size }, hints: { value: hints } } } = event
            const loc = { location: { type: 'Point', coordinates: [position[1], position[0]] } }

            onRegisterCache(name, description, loc, Number(difficulty), Number(terrain), size, hints)
        }}>
            <label for="name">Name</label>
            <input type="name" name="name" />
            <label for="description">Description</label>
            <input type="description" name="description" />
            <label for="difficulty">Difficulty</label>
            <input type="difficulty" name="difficulty" />
            <label for="terrain">Terrain</label>
            <input type="terrain" name="terrain" />
            <label for="size">Size</label>
            <input type="size" name="size" />
            <label for="hints">Hints</label>
            <input type="hints" name="hints" />

            <button>Proceed</button>
        </form>
        <MapProfile position={position}/>

    </>
    )
}

export default Profile