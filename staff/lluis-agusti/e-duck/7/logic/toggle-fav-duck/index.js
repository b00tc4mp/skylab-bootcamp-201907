logic.toggleFavDuck = function(id, token, duckId, expression) {
    validate.string(id, 'id')
    validate.string(token, 'token')
    validate.string(duckId, 'duck id')
    validate.function(expression, 'expression')

    call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get',
        { 'authorization': `bearer ${token}` },
        undefined,
        (error, response) => {
            if (error) expression(error)
            else if (response.status === 'KO') expression(new Error(response.error))
            else {
                const favorites = response.data.favorites

                const index = favorites.findIndex(favorite => favorite === duckId)

                if (index > -1) {
                    favorites.splice(index, 1)

                    call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'put',
                        { 'content-type': 'application/json', 'authorization': `bearer ${token}` },
                        { favorites },
                        (error, response) => {
                            if (error) expression(error)
                            else if (response.status === 'KO') expression(new Error(response.error))
                            else expression()
                        }
                    )
                } else
                    call('http://duckling-api.herokuapp.com/api/ducks/' + duckId, undefined, undefined, undefined, (error, duck) => {
                        if (error)
                            expression(new Error(`cannot retrieve duck with id ${duckId}`))
                        else if (duck.error) expression(new Error(duck.error))
                        else {
                            favorites.push(duckId)

                            call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'put',
                                { 'content-type': 'application/json', 'authorization': `bearer ${token}` },
                                { favorites },
                                (error, response) => {
                                    if (error) expression(error)
                                    else if (response.status === 'KO') expression(new Error(response.error))
                                    else expression()
                                }
                            )
                        }
                    })
            }
        }
    )
}