function Results(props) {
    return <nav className="results-nav">
        <ul className="results-ul">
        {props.items.map(item => <li className="results-li" key={item.url} onClick={ () => {
            props.onItem(item)
        }}>
            {props.paintItem(item)}
        </li>)}
        </ul>
    </nav>
}




/*iteracion 0.3 */
/* function Results(props){
    return <ul>
        {props.items.map(item=> <li key={item.url}> 
            {props.paintItem(item)}
        </li>)}
        
       
    </ul>
} */