function DisplayLyrics({ onDisplay }) {
    return <button onClick={event => {
        event.stopPropagation()

        onDisplay()
    }}>{'👁‍🗨'}</button>
}