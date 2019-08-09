/**
* Component list the lyrics found .
*/

function LyricsItem({ lyrics, onClose }) {
    return <>

    <section className="lyrics-item">
        <div className= "lyrics-item__panel">
            <button className="lyrics-item__button" onClick = {event => {
                    onClose()
                }}
                ><i className="far fa-eye-slash"></i></button>
            <h3 className="lyrics-item__lyrics">{lyrics}</h3>
            
        </div>
           
    </section>

    </>
}