function Results(props) {
    return <ul>
        {props.items.map((item) => <li key={item.track.commontrack_id}>
            {props.paintItem(item.track)}
        </li>)}
    </ul>
}