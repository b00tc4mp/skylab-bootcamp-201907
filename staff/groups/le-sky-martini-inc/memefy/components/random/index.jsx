 /**
 * Random item endpoint launcher.
 */

function Random(props) {
    return <section className={`random`}>
        <img className={`random__tv-remote`} src="https://media.giphy.com/media/LpvMOgLawT6x14rngP/giphy.gif" onClick={event => {
        event.preventDefault()
        
        props.onRandom()
        }}></img>
        <p><a className={`random__back`} href="" onClick={ event => {
                event.preventDefault()

                props.onBack()
            }}><i className="fas fa-arrow-left"></i> Go back</a></p>
    </section>
}