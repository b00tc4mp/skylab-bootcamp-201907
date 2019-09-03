/**
 * Component to print search results served by the API search endpoint.
 */

function Results(props) {
    return <ul className="results">
        {props.items.map((item) => <li key={item.track.track_id.toString()}>
            {props.paintItem(item.track)}
        </li>)}
    </ul>
}