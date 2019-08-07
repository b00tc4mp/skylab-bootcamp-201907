logic.searchGifs = function (id, token, query) {
    let favorites = []

    if (id != undefined && token != undefined) {
        validate.string(id, 'id')
        validate.string(token, 'token')
        validate.string(query, 'query', false)

        return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
            .then(response => {
                if (response.status === 'KO') throw new Error(response.error)

                favorites = response.data.favorites

                return call(`https://api.giphy.com/v1/gifs/search?api_key=yXEKD5c78ISwI8WSOKyTndpHZH9XpqQW&q=${query}`, 'get', undefined, undefined)
                    .then(res => res.data)
                    .then(gifs => {
                        if (gifs.error) return []
                        else {
                            favorites && gifs.forEach(gif => gif.favorite = favorites.includes(gif.id))
                            
                            return gifs
                        }
                    })
                    .then(randomGifs => {
                        if (randomGifs.error) return []
                        else {
                            return randomGifs
                        }
                    })
            }) 
    } else {
        validate.string(query, 'query', false)

        return call(`https://api.giphy.com/v1/gifs/search?api_key=yXEKD5c78ISwI8WSOKyTndpHZH9XpqQW&q=${query}`, 'get', undefined, undefined)
            .then(res => res.data)
            .then(gifs => {
            
                if (gifs.error) return []

                favorites && gifs.forEach(gif => gif.favorite = favorites.includes(gif.id))
                return gifs
            })
            .then(randomGifs => {
            
                if (randomGifs.error) return []
                else {
                    return randomGifs
                }
            })
    }
}