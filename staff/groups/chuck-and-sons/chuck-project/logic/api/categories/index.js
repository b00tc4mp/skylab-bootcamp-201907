logic.getCategories = () => {

    return call(`https://api.chucknorris.io/jokes/categories`, 'get', undefined, undefined)
        .then(categories => {
            if (categories.error) return []

            return categories
        })
}