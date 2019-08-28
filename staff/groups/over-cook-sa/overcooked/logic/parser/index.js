
/** 
 * Go through a meal array to take out all the ingredients 
 * and quantities to be able to see them on details 
 * 
 * @param {array} rawRecipe   -
 * 
 */

function recipeFormatter(rawRecipe){ //array
    let ingredients = []
    let recipeDetails = rawRecipe
    const recipeKeys = Object.keys(recipeDetails)
    const ingredientindex = recipeKeys.indexOf('strIngredient1')
    const measuresindex = recipeKeys.indexOf('strMeasure1')
    for( let i=0;i < recipeKeys.length; i++){
        if(i >= ingredientindex && i < measuresindex && recipeDetails[recipeKeys[i]] !== '' && recipeDetails[recipeKeys[i]] !== null)ingredients.push({
            ingredientName: recipeDetails[recipeKeys[i]],
            measure: recipeDetails[recipeKeys[(i-ingredientindex)+measuresindex]],
        })
    }  
    
    return ingredients
}