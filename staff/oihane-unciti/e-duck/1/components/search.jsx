function Search(props) {
    return <form onSubmit={event => {
        event.preventDefault()

        const { target: { query: { value: query } } } = event

        props.onSearch(query)
    }}>
        <h1>Find your Duck🐥</h1>
        <input type="text" name="query" />
        <button>🔍</button>
    </form>
}