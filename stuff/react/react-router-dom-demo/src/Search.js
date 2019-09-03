import React from 'react'

export default function({onSearch}) {
    return <form onSubmit={event => {
        event.preventDefault()

        const { target: { query: { value: query }}} = event

        onSearch(query)
    }}>
        <input type="text" name="query" />
        <button>Search</button>
    </form>
}