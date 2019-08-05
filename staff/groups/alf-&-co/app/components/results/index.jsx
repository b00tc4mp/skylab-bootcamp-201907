function Results(props) {
    return <ul>
        {/* For each movie in movies array, create a list element and add event listener with closure to it*/}
        {props.movies.map(movie => <li key={movie.id} onClick={ () => {
            props.onItem(movie.id)
        }}>
        {/* Send individual movie to paintItem which will create its visualization in the grid */}
        {props.paintItem(movie)}
        </li>)}
    </ul>
}