function Search(props) {
    return <form onSubmit={event => {
        event.preventDefault()

        const { target: { query: { value: query } } } = event

        props.onSearch(query)
    }}>
        <label className={`search__label`} for="query">Search</label>
        <input className={`search__input`} type="text" name="query" id="query"/>
        <button className={`search__button`}>🔍</button>
    </form>
}