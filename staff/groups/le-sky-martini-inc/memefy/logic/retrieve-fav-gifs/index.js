logic.retrieveFavGifs = function (id, token) {
    validate.string(id, 'id')
    validate.string(token, 'token')

    return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)

            const favorites = response.data.favorites

            if (!favorites.length) return []

            const calls = favorites.map(gifId =>
                call(`https://api.giphy.com/v1/gifs/${gifId}?api_key=yXEKD5c78ISwI8WSOKyTndpHZH9XpqQW`, undefined, undefined, undefined)
                    .then(res => res.data)
                    .then(gif => (gif.favorite = true) && gif)
            )

            return Promise.all(calls)
        })
}