function Results(props) {
    return <ul>
        {props.items.map(item => <li key={item.idTrack} onClick={ event => {
            event.stopPropagation()
            props.onItem(item.idTrack)
        }}>
            {props.paintItem(item)}
        </li>)}
    </ul>
}