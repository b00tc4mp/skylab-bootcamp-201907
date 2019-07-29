'use strict'

/**
 * Business Logic
 */

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const logic = {
    register(name, surname, email, password) {
        let errors = ''

        if (!name.trim()) {
            errors += 'Name is empty or blank.'
        }

        if (!surname.trim()) {
            if (errors) errors += '\n'

            errors += 'Surname is empty or blank.'
        }

        if (!email.trim()) {
            if (errors) errors += '\n'

            errors += 'E-mail is empty or blank.'
        } else if (!EMAIL_REGEX.test(email)) {
            if (errors) errors += '\n'

            errors += 'E-mail is not valid.'
        }

        if (!password.trim()) {
            if (errors) errors += '\n'

            errors += 'Password is empty or blank.\n'
        }

        if (errors)
            throw new Error(errors)
        else {
            const user = users.find(function (user) {
                return user.email === email
            })

            if (user) throw new Error('E-mail is already registered.')

            users.push({
                name: name,
                surname: surname,
                email: email,
                password: password
            })
        }
    },

    login(email, password) {
        let errors = ''

        if (!email.trim()) {
            errors += 'E-mail is empty or blank.'
        } else if (!EMAIL_REGEX.test(email)) {
            errors += 'E-mail is not valid.'
        }

        if (!password.trim()) {
            if (errors) errors += '\n'

            errors += 'Password is empty or blank.\n'
        }

        if (errors) throw new Error(errors)

        const user = users.find(function (user) {
            return user.email === email && user.password === password
        })

        if (!user) throw new Error('Wrong credentials.')
    },

    searchDucks(query, expression) {
        if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)

        if (typeof expression !== 'function') throw TypeError(`${expression} is not a function`)

        call('http://duckling-api.herokuapp.com/api/search?q=' + query, (error, result) => {
            if (error) {
                if (error.status < 500)
                    expression(undefined, [])
                else
                    expression(new Error(`fail search with criteria ${query}`))
            } else
                expression(undefined, result)
        })
    },

    retrieveDuck(id, expression) {
        // TODO validate id, expression

        call('http://duckling-api.herokuapp.com/api/ducks/' + id, (error, result) => {
            if (error)
                expression(new Error(`cannot retrieve duck with id ${id}`))
            else
                expression(undefined, result)
        })
    }
}
