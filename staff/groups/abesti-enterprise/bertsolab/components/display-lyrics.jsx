function DisplayLyrics({ onDisplay, trackId }) {
    return <button onClick={event => {
        event.stopPropagation()

        onDisplay(trackId)
    }}>{'👁‍🗨'}</button>
}