import React from 'react'
import { Link } from 'react-router-dom'

export default function () {
    return <>
        <h2>Dog added successfully</h2>
        <Link to="/mydogs">Go To My Dogs</Link>
    </>
}