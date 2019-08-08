function LyricsItem({ lyrics, onClose }) {
    return <>
    <section className="lyrics-item">
            <h3 className="lyrics-item__lyrics">{lyrics}</h3>
            <button className="lyrics-item__close-button" onClick = {event => {
                onClose()
            }}
            >✖</button>
        </section>
    </>
}