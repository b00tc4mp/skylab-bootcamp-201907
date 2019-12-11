import React from 'react'
import CartButton from '../Cart-button'
import logic from '../../logic'

function Results({ searchResult }) {

    const{ message, articles, error } = searchResult

    return <>
    
        <section className="searchResult">
        {error && <h4>{error}</h4>}
            <h4>{message}</h4>
            {articles && articles.map(item => {
                const {ref, title, description, img, price, quantity, id} = item
                return <ul key={id} className="searchResult__article" >
                    <li className="searchResult__article--param">Ref: {ref}</li>
                    <li className="searchResult__article--param">{title}</li>
                    <li className="searchResult__article--param">{description}</li>
                    <li className="searchResult__article--param"><img alt="" src={img}/></li>
                    <li className="searchResult__article--param">Price: {price} €</li>
                    <li className="searchResult__article--param">Stock: {quantity} uds</li>
                    {logic.isUserLogged() && <CartButton articleId={id}/>}
                </ul>
            })}
        </section>
    </>
}

export default Results