import React, { useState, useEffect } from 'react';
import CocktailResult from '../generic/CocktailResult'
import cocktailApi from '../../services/cocktail-api'

function CocktailbyName() {

    const [cocktail, setCocktail] = useState(null)
    const [query, setQuery] = useState("margarita")

    useEffect(() => {
        cocktailApi.searchCocktails(query)
            .then(cocktails => {
                const [cocktail] = cocktails
                setCocktail(cocktail)
            })
    }, [])


    const handleSearch = (query) => {
        debugger
        cocktailApi.searchCocktails(query)
            .then(cocktails => {
                const [cocktail] = cocktails
                setCocktail(cocktail)
                setQuery(query)
            })
            .catch(({ message }) => setQuery(message))

    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        debugger
        const { target: { cocktail: { value } } } = event
        handleSearch(value)
    }

    return (
        <div class="useEffect-canvas" >
            <form onSubmit={handleFormSubmit} id="hola">
                <input
                    class="input is-info"
                    name={"cocktail"}
                    placeholder={query}
                    required
                />
                <button class="button is-fullwidth is-info is-outlined">Search a cocktail!</button>
            </form>
            {cocktail && <CocktailResult cocktail={cocktail} />}
        </div>
    )
}


export default CocktailbyName;
