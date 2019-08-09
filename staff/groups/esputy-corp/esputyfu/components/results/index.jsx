function Results(props) {
    return <ul className='results__ul--res'>
        {props.items.map(item => <li className='results__li' key={item.idTrack} onClick={ () => {
            props.onItem(item.idTrack)
        }}>
            {props.paintItem(item)}
        </li>)}
    </ul>
}