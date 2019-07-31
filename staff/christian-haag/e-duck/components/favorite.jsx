function Favorite({ onBack }) {
    return <>
        <h2>Favorite</h2>
        <ul>
            {users[0].favorites.forEach(item => <li><h2>{item}</h2></li>)}
        </ul>
        <a href="" onClick={event => {
            event.preventDefault()
            onBack()
        }}>Go back</a>
    </>
}

