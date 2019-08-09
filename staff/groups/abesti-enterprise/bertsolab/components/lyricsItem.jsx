function LyricsItem({ lyrics, onClose }) {
    return <>
    <section className="lyrics-item">
            <h3 className="lyrics-item__lyrics">{lyrics}</h3>
            <button className="lyrics-item__button" onClick = {event => {
                onClose()
            }}
            ><i className="far fa-eye-slash"></i></button>
        </section>
    </>
}