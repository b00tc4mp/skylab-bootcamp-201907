'use strict'

/**
 * Business Logic
 */

const logic = (() => ({
    retrieveUser(id, token, expression) {
        validate.string(id, 'id')
        validate.string(token, 'token')
        validate.function(expression, 'expression')

        call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get',
            { 'authorization': `bearer ${token}` },
            undefined,
            (error, response) => {
                if (error) expression(error)
                else if (response.status === 'KO') expression(new Error(response.error))
                else expression(undefined, response.data)
            }
        )
    },

    searchDucks(id, token, query, expression) {
        let favorites

        if (id != undefined && token != undefined) {
            validate.string(id, 'id')
            validate.string(token, 'token')
            validate.string(query, 'query', false)
            validate.function(expression, 'expression')

            call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get',
                { 'authorization': `bearer ${token}` },
                undefined,
                (error, response) => {
                    if (error) expression(error)
                    else if (response.status === 'KO') expression(new Error(response.error))
                    else {
                        favorites = response.data.favorites

                        call('http://duckling-api.herokuapp.com/api/search?q=' + query, 'get', undefined, undefined, (error, ducks) => {
                            if (error) expression(new Error(`fail search with criteria ${query}`))
                            else {
                                if (ducks.error) expression(undefined, [])
                                else {
                                    favorites && ducks.forEach(duck => duck.favorite = favorites.includes(duck.id))

                                    expression(undefined, ducks)
                                }
                            }
                        })
                    }
                }
            )
        } else {
            validate.string(query, 'query', false)
            validate.function(expression, 'expression')

            call('http://duckling-api.herokuapp.com/api/search?q=' + query, 'get', undefined, undefined, (error, ducks) => {
                if (error) expression(new Error(`fail search with criteria ${query}`))
                else {
                    if (ducks.error) expression(undefined, [])
                    else {
                        favorites && ducks.forEach(duck => duck.favorite = favorites.includes(duck.id))

                        expression(undefined, ducks)
                    }
                }
            })
        }
    },

    retrieveDuck(id, token, duckId, expression) {
        let favorites

        if (id != undefined && token != undefined) {
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
                        favorites = response.data.favorites

                        call('http://duckling-api.herokuapp.com/api/ducks/' + duckId, 'get', undefined, undefined, (error, duck) => {
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
                }
            )
        } else {
            validate.string(duckId, 'duck id')
            validate.function(expression, 'expression')

            call('http://duckling-api.herokuapp.com/api/ducks/' + duckId, undefined, undefined, undefined, (error, duck) => {
                if (error)
                    expression(new Error(`cannot retrieve duck with id ${duckId}`))
                else if (duck.error) expression(new Error(duck.error))
                else expression(undefined, duck)
            })
        }
    },

    toggleFavDuck(id, token, duckId, expression) {
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
    },

    retrieveFavoriteDucks(id, token, expression) {
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
}))()
