function LyricsItem({ lyrics, onClose }) {
    return <>
        <h3>{lyrics}</h3>
        <button onClick = {event => {
            onClose()
        }}
        >✖</button>
    </>
}