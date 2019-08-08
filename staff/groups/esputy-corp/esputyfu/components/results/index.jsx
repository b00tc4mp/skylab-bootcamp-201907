function Results(props) {
    return <ul>
        {props.items.map(item => <li key={item.idTrack} onClick={ () => {
            props.onItem(item.idTrack)
        }}>
            {props.paintItem(item)}
        </li>)}
    </ul>
}