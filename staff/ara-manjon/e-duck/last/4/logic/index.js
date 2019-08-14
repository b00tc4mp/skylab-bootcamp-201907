'use strict'

/**
 * Business Logic
 */

const logic = (() => {
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return {
        registerUser(name, surname, username, password, repassword, expression) {
            if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
            if (!name.trim()) throw new Error('name is empty or blank')

            if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
            if (!surname.trim()) throw new Error('surname is empty or blank')

            if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
            if (!username.trim()) throw new Error('username is empty or blank')
            if (!EMAIL_REGEX.test(username)) throw new Error('username is not valid')

            if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
            if (!password.trim()) throw new Error('password is empty or blank')

            if (typeof repassword !== 'string') throw TypeError(`${repassword} is not a string`)
            if (!repassword.trim()) throw new Error('password repeat is empty or blank')

            if (password !== repassword) throw new Error('passwords do not match')

            if (typeof expression !== 'function') throw TypeError(`${expression} is not a function`)

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
            if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
            if (!username.trim()) throw new Error('username is empty or blank')
            if (!EMAIL_REGEX.test(username)) throw new Error('username is not valid')

            if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
            if (!password.trim()) throw new Error('password is empty or blank')

            if (typeof expression !== 'function') throw TypeError(`${expression} is not a function`)

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
            if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
            if (!id.trim()) throw new Error('id is empty or blank')

            if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
            if (!token.trim()) throw new Error('token is empty or blank')

            if (typeof expression !== 'function') throw TypeError(`${expression} is not a function`)

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

        searchDucks(id, token, query, expression) { // TODO use 'id' and 'token' instaead of 'username'
            let favorites

            if (typeof id !== 'undefined' && typeof token !== 'undefined') {
                if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
                if (!id.trim()) throw new Error('id is empty or blank')

                if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
                if (!token.trim()) throw new Error('token is empty or blank')

                if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)

                if (typeof expression !== 'function') throw TypeError(`${expression} is not a function`)

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
                if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)

                if (typeof expression !== 'function') throw TypeError(`${expression} is not a function`)

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
//-------------------------------------
        retrieveDuck(id, token, duckId, expression) {
            let favorites

            if (typeof id !== 'undefined' && typeof token !== 'undefined') {
                if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
                if (!id.trim()) throw new Error('id is empty or blank')

                if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
                if (!token.trim()) throw new Error('token is empty or blank')

                const user = users.find(user => user.username === username)

                if (!user) throw new Error(`user with username ${username} not found`)

                favorites = user.favorites
            }

            if (typeof duckId !== 'string') throw new TypeError(`${duckId} is not a string`)
            if (!duckId.trim()) throw new Error('id is empty or blank')

            if (typeof expression !== 'function') throw TypeError(`${expression} is not a function`)

            call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get',
            { 'authorization': `bearer ${token}` },
            undefined,
            (error, response) => {
                if (error) expression(error)
                else if (response.status === 'KO') expression(new Error(response.error))
                else {
                    favorites = response.data.favorites

                    call('http://duckling-api.herokuapp.com/api/ducks/' + duckId, 'get', undefined, undefined, (error, duck) => {
                        if (error) expression(new Error(`fcannot retrieve uck with id ${duckId}`))
                        else {
                            if (duck.error) expression()
                            else {
                                favorites && (duck.favorite = favorites.includes(duck.id))

                                expression(undefined, duck)
                            }
                        }
                    })
                }
            }
        )
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
