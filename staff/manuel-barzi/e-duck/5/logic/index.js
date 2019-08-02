'use strict'

/**
 * Business Logic
 */

const logic = (() => {


    return {
        registerUser(name, surname, username, password, repassword, expression) {
            validate.string(value, 'name')
            validate.string(surname, 'surname')
            validate.string(username, 'username')
            validate.email(username, 'username')
            validate.string(password, 'password')
            validate.string(repassword, 'password repeat')
            validate.function(expression, 'expression')

            if (password !== repassword) throw new Error('passwords do not match')

            call('https://skylabcoders.herokuapp.com/api/user', 'post',
                { 'content-type': 'application/json' },
                { name, surname, username, password, favorites: [] },
                (error, response) => {
                    if (error) expression(error)
                    else if (response.status === 'KO') expression(new Error(response.error))
                    else expression()
                }
            )
        },

        authenticateUser(username, password, expression) {
            validate.string(username, 'username')
            validate.email(username, 'username')
            validate.string(password, 'password')
            validate.function(expression, 'expression')

            call('https://skylabcoders.herokuapp.com/api/auth', 'post',
                { 'content-type': 'application/json' },
                { username, password },
                (error, response) => {
                    if (error) expression(error)
                    else if (response.status === 'KO') expression(new Error(response.error))
                    else expression(undefined, response.data)
                }
            )
        },

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

        toggleFavDuck(username, id, expression) {
            // TODO validate args (type and content, where it applies)

            const user = users.find(user => user.username === username)

            if (!user) throw Error(`user with username ${username} not found`)

            const { favorites } = user

            const index = favorites.findIndex(favorite => favorite === id)

            if (index > -1) {
                favorites.splice(index, 1)

                expression()
            } else
                call('http://duckling-api.herokuapp.com/api/ducks/' + id, error => {
                    if (error)
                        expression(new Error(`cannot retrieve duck with id ${id}`))
                    else {
                        favorites.push(id)

                        expression()
                    }
                })
        },

        retrieveFavoriteDucks(username, expression) {
            // TODO valide args

            const user = users.find(user => user.username === username)

            if (!user) throw Error(`user with username ${username} not found`)

            const { favorites } = user

            if (!favorites.length) expression([])
            else {
                let count = 0
                const ducks = []
                let _error

                favorites.forEach(id => {
                    call('http://duckling-api.herokuapp.com/api/ducks/' + id, (error, duck) => {
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
})()
