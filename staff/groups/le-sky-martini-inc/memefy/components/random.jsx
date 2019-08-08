function Random(props) {
    return <section className={`random`}>
        <img className={`random__tv-remote`} src="https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/remote-control-icon-18-256.png" onClick={event => {
        event.preventDefault()
        
        props.onRandom()
        }}></img>
        <p><a className={`random__back`} href="" onClick={ event => {
                event.preventDefault()

                props.onBack()
            }}><i class="fas fa-arrow-left"></i> Go back</a></p>
    </section>
}