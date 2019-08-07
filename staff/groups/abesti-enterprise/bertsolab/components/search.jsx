function Search(props) {
    return <form onSubmit={event => {
        event.preventDefault()

        const { target: { q_track: { value: q_track }, q_artist: { value: q_artist } } } = event

        props.onSearch(q_artist, q_track)
    }}>
        <h1>Find your favorite lyric</h1>
        <input type="text" name="q_artist" placeholder="write the performer" />
        <input type="text" name="q_track" placeholder="write the song title" />

        <button>🔍</button>
    </form>
}