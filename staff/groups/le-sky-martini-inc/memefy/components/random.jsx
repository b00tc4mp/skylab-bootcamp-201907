function Random(props) {
    return <setion className={`random`}>
        <img className={`random__tv-remote`} src="https://www.pngrepo.com/download/9781/remote-control.png" onClick={event => {
        event.preventDefault()
        
        props.onRandom()
        }}></img>
        <a className={`random__back`} href="" onClick={ event => {
                event.preventDefault()

                props.onBack()
            }}>Go back</a>
    </setion>
}