import React, { Component } from 'react';
import CocktailResult from '../generic/CocktailResult'
import cocktailApi from '../../services/cocktail-api'

class CocktailbyName extends Component {

    state = { cocktail: null, query: "margarita" }

    componentDidMount() {
        cocktailApi.searchCocktails(this.state.query)
            .then(cocktails => {
                const [cocktail] = cocktails
                this.setState({ cocktail })
            })

    }

    handleSearch = (query) => {
        debugger
        cocktailApi.searchCocktails(query)
            .then(cocktails => {
                const [cocktail] = cocktails
                this.setState({ cocktail, query })
            })
            .catch(({ message }) => this.setState({ query: message }))

    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        debugger
        const { target: { cocktail: { value } } } = event
        this.handleSearch(value)
    }

    render() {
        const { state: { cocktail, query }, handleFormSubmit } = this
        return (
            <div class="useEffect-canvas" >
                <form onSubmit={handleFormSubmit} id="hola">
                    <input
                        class="input is-info"
                        name={"cocktail"}
                        placeholder={query}
                        required
                    />
                    <button class="button is-fullwidth is-info is-outlined">Submit</button>
                </form>
                {cocktail && <CocktailResult cocktail={cocktail} />}
            </div>
        )
    }
}

export default CocktailbyName;
