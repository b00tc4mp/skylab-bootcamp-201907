function Search(props) {
    return <form onSubmit={event => {
        event.preventDefault()

        const { target: { query: { value: query } } } = event

        props.onSearch(query)
    }}>
        <input type="text" name="query" />
        <button>🔍</button>
    </form>
}