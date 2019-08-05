logic.searchByName = function (name) {
    validate.string(name, 'name')

    return call(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`, 'get', undefined, undefined)
        .then(response => {
            if (response.meals === null) throw new Error('No meals found')
            return response.meals
        })
}