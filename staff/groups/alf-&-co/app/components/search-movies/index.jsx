function Search(props) {
    return <form className="form" onSubmit={event => {
        event.preventDefault()

        const { target: { query: { value: query } } } = event

        props.onSearch(query)
    }}>
        <input type="text" name="query" placeholder="Search by movie title..."/>
        <button>🔍</button>
    </form>
}