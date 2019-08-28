/**
 * Search input for the query.
 */

function Search(props) {
    return <form className="form search-form" onSubmit={event => {
        event.preventDefault()
        
        const { target: { q_track: { value: q_track }, q_artist: { value: q_artist } } } = event

        props.onSearch(q_artist, q_track)
    }}>
        <h1 className="search-form__title form__title" >Find your favorite lyrics {props.username? `, ${props.username}!` : ''}</h1>
        <input className="search-form__query-field form__field" type="text" name="q_artist" placeholder="Who's the performer?" />
        <input className="search-form__query-field form__field" type="text" name="q_track" placeholder="What's the song title?" />

        <button className="search-form__button form__button"><i className="fas fa-search"></i></button>
    </form>
}