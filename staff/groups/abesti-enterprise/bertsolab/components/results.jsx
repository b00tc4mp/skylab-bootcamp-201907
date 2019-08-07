function Results(props) {
    return <ul>
        {props.items.map((item) => <li key={item.track.commontrack_id} onClick={ () => {
            props.onItem(item.track)
        }}>
            {props.paintItem(item.track)}
        </li>)}
    </ul>
}