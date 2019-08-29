import React, { useState, useEffect } from 'react';
import cocktailApi from '../../../services/cocktail-api'

function SearchCocktail({ reducer }) {

    const [cocktail, setCocktail] = useState(null)

    async function handleSearch(event) {
        event.preventDefault()
        const { target: { cocktail: { value: query } } } = event
        const [cocktail] = await cocktailApi.searchCocktails(query)
        setCocktail(cocktail)
    }

    function handleAdd(e) {
        e.preventDefault()
        cocktail.quantity = 1
        reducer({ type: 'new', cocktail })
    }

    return (
        <div >
            <form onSubmit={handleSearch}>
                <input
                    class="input is-info"
                    name="cocktail"
                    required
                />
                <button class="button is-fullwidth is-info is-outlined">Search Cocktail</button>
            </form>

            {cocktail ? <div class="section">
                <img class="image" src={cocktail.strDrinkThumb} width="100px" />
                <p>{cocktail.strDrink}</p>
                <button class="button is-info" onClick={handleAdd}>🛒</button>
            </div> : ""}
        </div>
    )
}

export default SearchCocktail;
