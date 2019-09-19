import React from 'react'
import { Link } from 'react-router-dom'

export default function () {
    return <>
        <h2>Are you Sure?</h2>
        <Link to="/">CONFIRM</Link>
        <Link to="/">CANCEL</Link>
    </>
}