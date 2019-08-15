 /**
 * Component to print search results served by the API search endpoint.
 */

function Results(props) {
    return <section className={`results hide`}>
        <ul className={`results__list`}>
        {props.items.map(item => <li className={`results__item`} key={item.id} onClick={ () => {
            props.onItem(item.id)
        }}>
            {props.paintItem(item)}
        </li>)}
    </ul></section>
}