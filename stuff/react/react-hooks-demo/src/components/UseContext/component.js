import React, { Component } from 'react'
import RegisterPrice from './RegisterPrice' //useState hook version
import RandomCard from './RandomCard'

import cocktailApi from '../../services/cocktail-api'  //Class Component version

class RandomPriceCard extends Component {
    state = { cocktail: null, price: "" }

    componentDidMount() {
        cocktailApi.randomCocktail()
            .then(cocktail => {
                this.setState({ cocktail })
            })
    }

    handlePrice = (value) => {
        this.setState({ price:value })
    }

    render() {

        const { state: { cocktail, price }, handlePrice } = this
        return (
            <div className="useState" >
                <section>
                    <RegisterPrice setPrice={handlePrice} />
                    <RandomCard name={price} cocktail={cocktail} />
                </section>
            </div>

        )
    }
}
export default RandomPriceCard;