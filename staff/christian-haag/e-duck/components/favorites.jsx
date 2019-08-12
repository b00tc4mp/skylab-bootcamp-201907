function Favorites({ onBack }) {
    const { favorites } = users
    return <>
        <h2>My Favorites</h2>
        <ul>
            {favorites.forEach((item, index) => <li key={index}>{item}</li>)}
        </ul>
        <a href="" onClick={event => {
            event.preventDefault();

            onBack()
        }}>Go Back</a>
    </>
}