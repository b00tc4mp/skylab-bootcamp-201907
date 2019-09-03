
function Results(props) {
    return <ul>
        {props.items.map(item => <li key={item.id}>
            {props.paintItem(item)}
        </li>)}
    </ul>
}