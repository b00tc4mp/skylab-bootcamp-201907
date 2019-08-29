import React, { useState, useReducer } from 'react';
import SearchCocktail from './SearchCocktail'
import Cart from './Cart'

function CocktailCart() {

    const [toggleCart, setToggleCart] = useState(false)

    const [cocktails, dispatch] = useReducer((state, action) => {
        switch (action.type)
        {
            case 'new':
                const newList = Array.from(state)
                newList.push(action.cocktail)
                return newList
            case 'add':
                return state.map(cocktail => {
                    if (cocktail.strDrink === action.name) cocktail.quantity++
                    return cocktail
                })
            case 'delete':
                return state.filter(cocktail => {
                    if (cocktail.strDrink !== action.name) return cocktail
                })
        }
    }, [])
    return (
        <div class="hook-canvas">
            <nav class="navbar  is-info" >
                <div class="navbar-start">
                    <a class="navbar-item">
                        <button class="button is-info is-inverted" onClick={e => setToggleCart(!toggleCart)}>🛒{cocktails.length}</button>
                    </a>
                </div>
                <div class="navbar-end">
                    <h3 class="navbar-item">
                        Cocktail E-comerce
                    </h3>

                </div>
            </nav>
            <div class="card-content">
                {toggleCart ?
                    <Cart cocktails={cocktails} reducer={dispatch} />
                    :
                    <SearchCocktail reducer={dispatch} />
                }
            </div>
        </div>
    )
}

export default CocktailCart;