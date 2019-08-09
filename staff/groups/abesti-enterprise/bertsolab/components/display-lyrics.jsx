function DisplayLyrics({ onDisplay }) {
    return <button className="display-lyrics" onClick={event => {
        event.stopPropagation()

        onDisplay(trackId)
    }}>{'👁‍🗨'}</button>
}