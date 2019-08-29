import React, { useReducer } from 'react';
import cocktailApi from '../../../services/cocktail-api'

function Cart({ cocktails, reducer }) {

    return (
        <div >
            {cocktails.length ? cocktails.map(cocktail => <div class="columns">
                <img class="column" src={cocktail.strDrinkThumb} width="50px" />
                <div class="column field has-addons"> 
                    <div class="control">
                        <button class="button is-info" onClick={e => reducer({ type: 'add',  name: cocktail.strDrink })} >🛒</button>
                    </div>
                    <div class="control">
                        <button class="button is-danger" onClick={e => reducer({ type: 'delete', name: cocktail.strDrink })}>❌</button>
                    </div>
                </div>
                <span class="column field has-addons">{cocktail.quantity}</span>
            </div>) : "No Cocktails"}
        </div>
    )
}

export default Cart;
