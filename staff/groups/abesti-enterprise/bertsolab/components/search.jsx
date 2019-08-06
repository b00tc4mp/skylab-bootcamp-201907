function Search(props) {
    return <form onSubmit={event => {
        event.preventDefault()

        const { target: { query: { value: query } } } = event

        props.onSearch(query)
    }}>
        <h1>Find your favourite lyric</h1>
        <input type="text" name="word" placeholder="write the word" />
        <input type="text" name="author" placeholder="write the singer" />

        <button>🔍</button>
    </form>
}