import React from 'react'
import { Link } from 'react-router-dom'
import DogResult from '../DogResult'

export default function SearchResults({ dogs }) {

    return <>
        <Link to="/profile">Go Back</Link>
        <input type="text" placeholder="Find your dog ..."></input>
        <ul>
            {dogs.map(dog => <DogResult dog={dog} />)}
        </ul>
    </>
}