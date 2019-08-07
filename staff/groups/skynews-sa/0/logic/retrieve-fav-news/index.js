logic.retrieveFavNews = function (id, token) {
  validate.string(id, 'id')
  validate.string(token, 'token')

  return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)

            const favorites = response.data.favorites

            if (!favorites.length) return []

            const calls = favorites.map(//?? =>
                (article => (article.favorite = true) && article)
            )

            return calls
        })
}

//?????????????????????????????????