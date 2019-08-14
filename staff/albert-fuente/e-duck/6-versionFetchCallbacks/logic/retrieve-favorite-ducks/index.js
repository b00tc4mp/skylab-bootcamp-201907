logic.retrieveFavoriteDucks = function(id, token, expression) {
    validate.string(id, 'id')
    validate.string(token, 'token')
    validate.function(expression, 'expression')

    call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get',
        { 'authorization': `bearer ${token}` },
        undefined,
        (error, response) => {
            if (error) expression(error)
            else if (response.status === 'KO') expression(new Error(response.error))
            else {
                const favorites = response.data.favorites

                if (!favorites.length) expression(undefined, [])
                else {
                    let count = 0
                    const ducks = []
                    let _error

                    favorites.forEach(id => {
                        call('http://duckling-api.herokuapp.com/api/ducks/' + id, undefined, undefined, undefined, (error, duck) => {
                            if (error) {
                                if (!_error) _error = error
                            } else {
                                ducks.push(duck)
                            }

                            count++

                            if (count === favorites.length) {
                                if (_error) expression(_error)
                                else expression(undefined, ducks)
                            }
                        })
                    })
                }
            }
        }
    )
}