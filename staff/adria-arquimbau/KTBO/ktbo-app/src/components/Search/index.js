/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

function Search({ onSearch }) {

    return <form onSubmit={event => {
        event.preventDefault()

        const { target: { query: { value: query }}} = event
        
        onSearch(query)
        }}>
        <input className="navigation__search--input" placeholder="Search article" type="text" name="query" />
        <button className="navigation__search--button">Search product</button>
    </form>
}

export default Search