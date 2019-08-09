/**
* Event display song.
*/




function DisplayLyrics({ onDisplay, trackId }) {
    return <button className="lyrics-item__button" onClick={event => {
        event.stopPropagation()

        onDisplay(trackId)
    }}>{<i className="far fa-eye"></i>}</button>
}