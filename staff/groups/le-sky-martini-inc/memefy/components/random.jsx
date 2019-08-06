function Random(props) {
    return <button onClick={event => {
        event.preventDefault()
        
        props.onRandom()
    }}>?</button>
}