logic.retrieveDuck = function (id, token, duckId, expression) {
    let favorites

    if (id != undefined && token != undefined) {
        validate.string(id, 'id')
        validate.string(token, 'token')
        validate.string(duckId, 'duck id')
        validate.function(expression, 'expression')

        return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get',
            { 'authorization': `bearer ${token}` },
            undefined)
            .then(response => {
                if (response.status === 'KO') throw new Error(response.error)
                else {
                    favorites = response.data.favorites

                    return call('http://duckling-api.herokuapp.com/api/ducks/' + duckId, 'get', undefined, undefined, (error, duck) => {
                        if (error)
                            expression(new Error(`cannot retrieve duck with id ${duckId}`))
                        else {
                            if (duck.error) expression(new Error(duck.error))
                            else {
                                favorites && (duck.favorite = favorites.includes(duckId))

                                expression(undefined, duck)
                            }
                        }
                    })

                }
            })




    } else {
        validate.string(duckId, 'duck id')
        validate.function(expression, 'expression')

        return call('http://duckling-api.herokuapp.com/api/ducks/' + duckId, undefined, undefined, undefined, (error, duck) => {
            if (error)
                expression(new Error(`cannot retrieve duck with id ${duckId}`))
            else if (duck.error) expression(new Error(duck.error))
            else expression(undefined, duck)
        })
    }
}