import React from 'react';

function CocktailResult({ cocktail }) {
    const { strDrink: drinkName, strDrinkThumb: drinkImage, strAlcoholic: drinkAlcohol } = cocktail
    return <div class="card">
        <div class="card-image">
            <figure class="image is-4by4">
                <img src={drinkImage} width="100px" />
            </figure>
        </div>
        <div class="card-content" >
            <h3 class="title is-4">{drinkName}</h3>
            <p class="subtitle is-6">{drinkAlcohol}</p>
        </div>

    </div>
}

export default CocktailResult;
