import React, { useState, useEffect } from 'react'
import DemoContext from './DemoContext'
import RegisterPrice from './RegisterPrice' //useState hook version
import RandomCard from './RandomCard'

import cocktailApi from '../../services/cocktail-api'  //Class Component version

function RandomPriceCard() {
    const [cocktail, setCocktail] = useState(null)
    const [price, setPrice] = useState("")

    useEffect(() => {
        cocktailApi.randomCocktail()
            .then(cocktail => {
                setCocktail(cocktail)
            })

    }, [])

    return (
        <div>
            <section>
                <DemoContext.Provider value={{ cocktail, setCocktail, price, setPrice }} >
                    <RegisterPrice />
                    <RandomCard />
                </DemoContext.Provider>
            </section>
        </div>

    )

}
export default RandomPriceCard;