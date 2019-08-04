
logic.retrieveFavoriteDucks = function (id, token) {
    validate.string(id, 'id')
    validate.string(token, 'token')


    call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get',
        { 'authorization': `bearer ${token}` },
        undefined)
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)
            else {
                const favorites = response.data.favorites
                if (!favorites.length) return []
                else {
                    let count = 0
                    const ducks = []
                    let _error
                    favorites.forEach(id => {
                        return call('http://duckling-api.herokuapp.com/api/ducks/' + id, undefined, undefined, undefined)
                            .then(response => {
                                if (response.error) {
                                    if (!_error) _error = error
                                    throw new Error(response.error)
                                } else {
                                    ducks.push(duck)
                                }

                                if (count === favorites.length) {
                                    if (_error) return _error
                                } else {
                                    return ducks
                                }
                            })

                    })
                }
            }

        })

}

