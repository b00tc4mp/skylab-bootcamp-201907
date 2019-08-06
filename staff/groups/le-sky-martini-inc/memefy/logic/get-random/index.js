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

                    .then(gif => {
                        if (gif.error) throw new Error(gif.error)

                        favorites && (gif.favorite = favorites.includes(gifId))

                        return gif
                        
                    })
                    
                    
            })
    } else {

        return call(`https://api.giphy.com/v1/gifs/random?api_key=yXEKD5c78ISwI8WSOKyTndpHZH9XpqQW`, undefined, undefined, undefined)
            
            .then(gif => {
                if (gif.error) throw new Error(gif.error)

                return gif
            })
            
    }
}
