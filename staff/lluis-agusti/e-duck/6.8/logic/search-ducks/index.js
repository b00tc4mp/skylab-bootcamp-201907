logic.searchDucks = function (id, token, query) {
    let favorites

    if (id != undefined && token != undefined) {
        validate.string(id, 'id')
        validate.string(token, 'token')
        validate.string(query, 'query', false)

        return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
            .then(response => {
                if (response.status === 'KO') throw new Error(response.error)

                favorites = response.data.favorites

                return call(`https://api.giphy.com/v1/gifs/search?api_key=yXEKD5c78ISwI8WSOKyTndpHZH9XpqQW&q=${query}&limit=15&offset=0&rating=R&lang=en`, 'get', undefined, undefined)
                    .then(ducks => {
                        if (ducks.error) return []
                        else {
                            favorites && ducks.forEach(duck => duck.favorite = favorites.includes(duck.id))

                            return ducks
                        }
                    })
            })
    } else {
        validate.string(query, 'query', false)

        return call(`https://api.giphy.com/v1/gifs/search?api_key=yXEKD5c78ISwI8WSOKyTndpHZH9XpqQW&q=${query}&limit=15&offset=0&rating=R&lang=en`, 'get')
            .then(ducks => {
                if (ducks.error) return []

                favorites && ducks.forEach(duck => duck.favorite = favorites.includes(duck.id))

                return ducks
            })
    }
}