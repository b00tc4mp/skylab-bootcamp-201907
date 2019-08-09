function Results(props) {
    return <nav className="results">
        <ul className="results__ul">
        {props.items.map(item => <li className="results__li" key={item.url} onClick={ () => {
            props.onItem(item)
        }}>
            {props.paintItem(item)}
        </li>)}
        </ul>
    </nav>
}
