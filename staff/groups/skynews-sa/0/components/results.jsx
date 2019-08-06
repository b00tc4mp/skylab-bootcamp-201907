function Results(props) {
    return <ul>
        {props.items.map(item => <li key={item.url} onClick={ () => {
            props.onItem(item)
        }}>
            {props.paintItem(item)}
        </li>)}
    </ul>
}




/*iteracion 0.3 */
/* function Results(props){
    return <ul>
        {props.items.map(item=> <li key={item.url}> 
            {props.paintItem(item)}
        </li>)}
        
       
    </ul>
} */