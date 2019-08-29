import React, { useState, useReducer } from 'react';
import SearchCocktail from './SearchCocktail'
import Cart from './Cart'

function CocktailCart() {

    const [toggleCart, setToggleCart] = useState(false)

    function deleteItem(cocktailName) {
        const newList = cocktails.filter(cocktail => {
            if (cocktail.strDrink !== cocktailName) return cocktail
        })
        setCocktails(newList)
    }

    function newItem(cocktail) {
        const newList = Array.from(cocktails)
        newList.push(cocktail)
        setCocktails(newList)
    }

    function addItem(cocktailName) {
        debugger
        const newList = cocktails.map(cocktail => {
            if (cocktail.strDrink === cocktailName) cocktail.quantity++
            return cocktail
        })
        setCocktails(newList)
    }


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
                    <Cart cocktails={cocktails} deleteItem={deleteItem} addItem={addItem} />
                    :
                    <SearchCocktail newItem={newItem} />
                }
            </div>
        </div>
    )
}

export default CocktailCart;

export default CocktailCart;
