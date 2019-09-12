import React from 'react'
import { Link } from 'react-router-dom'

export default function () {
    return <>
        <h2>USERNAME</h2>
        <Link to="/mydogs">My Dogs</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/alerts">Alerts</Link>
        <Link to="/messages">Messages</Link>
        <Link to="/about">About WannaDOG</Link>
        <button>LOGOUT</button>
    </>
}