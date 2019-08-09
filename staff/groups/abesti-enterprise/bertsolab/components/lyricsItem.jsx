function LyricsItem({ lyrics, onClose }) {
    return <>
        <section className="display-song">
            <h3>{lyrics}</h3>
            <button className="display-song__cross" onClick = {event => {
                onClose()
            }}
            >✖</button>
        </section>
        
    </>
}