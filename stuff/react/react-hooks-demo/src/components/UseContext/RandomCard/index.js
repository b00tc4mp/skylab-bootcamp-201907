import React, { useContext } from 'react';
import CocktailResult from '../../generic/CocktailResult'

import DemoContext from '../DemoContext' //you should import a context


function RandomCard(/* { price, cocktail } */) {   // ****Props for the non-context version
    const { price, cocktail } = useContext(DemoContext)  //useContext for Context version

    return <div>
        <h3 class="title "> 💲 Price : {price}</h3>
        {cocktail && <CocktailResult cocktail={cocktail} />}

    </div>

}

export default RandomCard;
