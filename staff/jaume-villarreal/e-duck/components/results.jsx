function Results(props) {
    return <ul>
        {props.items.map(item => <li key={item.id} onClick = { () => {
        props.onItemClicked(item.id)
    }}>
            {props.paintItem(item)}
        </li>)}
    </ul>
}