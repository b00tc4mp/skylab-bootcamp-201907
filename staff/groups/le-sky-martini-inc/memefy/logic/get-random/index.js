logic.getRandom = function (id, token, gifId) {
    let favorites = []

    if (id != undefined && token != undefined) {
        validate.string(id, 'id')
        validate.string(token, 'token')

        return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
            .then(response => {
                if (response.status === 'KO') throw new Error(response.error)

                favorites = response.data.favorites

                return call(`https://api.giphy.com/v1/gifs/random?api_key=yXEKD5c78ISwI8WSOKyTndpHZH9XpqQW`, 'get', undefined, undefined)

                    .then(randomGif => {
                        if (randomGif.error) throw new Error(randomGif.error)

                        favorites && (randomGif.favorite = favorites.includes(gifId))

                        return randomGif
                        
                    })
                    
                    
            })
    } else {

        return call(`https://api.giphy.com/v1/gifs/random?api_key=yXEKD5c78ISwI8WSOKyTndpHZH9XpqQW`, undefined, undefined, undefined)
            
            .then(randomGif => {
                if (randomGif.error) throw new Error(randomGif.error)

                return randomGif
            })
            
    }
}
