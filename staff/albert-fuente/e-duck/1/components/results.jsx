function Results(props) {
    return <ul>
        {props.items.map(item => <li key={item.id} onClick={()=>{
            props.onItemClicked(item.id) //captura el click callback que posem a landing
        }}>
            {props.paintItem(item)}
        </li>)}
    </ul>
}