function Button() {
    return <>
        <button onClick={event => {
            event.preventDefault()
            console.log('hello')
        }
        }>Register</button>

        <button onClick={event => {
            event.preventDefault()
            console.log('world')
        }
        }>Login</button>
    </>
}