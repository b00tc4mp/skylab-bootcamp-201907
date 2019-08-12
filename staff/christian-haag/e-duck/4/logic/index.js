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
            if (!username.trim()) throw new Error('e-mail is empty or blank')
            if (!EMAIL_REGEX.test(username)) throw new Error('e-mail is not valid')

            if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
            if (!password.trim()) throw new Error('password is empty or blank')

            if (typeof repassword !== 'string') throw TypeError(`${repassword} is not a string`)
            if (!repassword.trim()) throw new Error('password repeat is empty or blank')

            if (password !== repassword) throw new Error('passwords do not match')

            call('https://skylabcoders.herokuapp.com/api/user', 'post',
                { 'content-type': 'application/json' },
                { name, surname, username, password },
                (error, response) => {
                    if (error) expression(error)
                    else if (response.status === 'KO') expression(new Error(response.error))
                    else expression()
                }
            )
        },

        authenticateUser(username, password) {
            if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
            if (!username.trim()) throw new Error('e-mail is empty or blank')
            if (!EMAIL_REGEX.test(username)) throw new Error('e-mail is not valid')

            if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
            if (!password.trim()) throw new Error('password is empty or blank')

            const user = users.find(function (user) {
                return user.username === username && user.password === password
            })

            if (!user) throw new Error('wrong credentials')
        },

        retrieveUser(username) {
            if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
            if (!username.trim()) throw new Error('e-mail is empty or blank')
            if (!EMAIL_REGEX.test(username)) throw new Error('e-mail is not valid')

            const user = users.find(function (user) {
                return user.username === username
            })

            if (!user) throw new Error(`user with e-mail ${username} not found`)

            const { name, surname, username: _username } = user

            return { name, surname, username: _username }
        },

        searchDucks(username, query, expression) {
            let favorites

            if (typeof username !== 'undefined') {
                if (typeof username !== 'string') throw new TypeError(`${username} is not a string`)
                if (!username.trim()) throw new Error('e-mail is empty or blank')
                if (!EMAIL_REGEX.test(username)) throw new Error('e-mail is not valid')

                const user = users.find(user => user.username === username)

                if (!user) throw new Error(`user with e-mail ${username} not found`)

                favorites = user.favorites
            }

            if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)

            if (typeof expression !== 'function') throw TypeError(`${expression} is not a function`)

            call('http://duckling-api.herokuapp.com/api/search?q=' + query, (error, ducks) => {
                if (error) {
                    if (error.status < 500)
                        expression(undefined, [])
                    else
                        expression(new Error(`fail search with criteria ${query}`))
                } else {
                    favorites && ducks.forEach(duck => duck.favorite = favorites.includes(duck.id))

                    expression(undefined, ducks)
                }
            })
        },

        retrieveDuck(username, id, expression) {
            let favorites

            if (typeof username !== 'undefined') {
                if (typeof username !== 'string') throw new TypeError(`${username} is not a string`)
                if (!username.trim()) throw new Error('e-mail is empty or blank')
                if (!EMAIL_REGEX.test(username)) throw new Error('e-mail is not valid')

                const user = users.find(user => user.username === username)

                if (!user) throw new Error(`user with e-mail ${username} not found`)

                favorites = user.favorites
            }

            if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)
            if (!id.trim()) throw new Error('id is empty or blank')

            if (typeof expression !== 'function') throw TypeError(`${expression} is not a function`)

            call('http://duckling-api.herokuapp.com/api/ducks/' + id, (error, duck) => {
                if (error)
                    expression(new Error(`cannot retrieve duck with id ${id}`))
                else {
                    favorites && (duck.favorite = favorites.includes(id))

                    expression(undefined, duck)
                }
            })
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
