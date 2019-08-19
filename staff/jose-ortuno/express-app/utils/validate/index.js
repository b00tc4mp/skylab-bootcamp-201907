const check = require('../check')

module.exports = {
    string(target, name, empty = true, value) {
        const error = check.string(target, name, empty, value)
        if (error) throw Error(error)
    },

    email(target, name) {
        const error = check.email(target, name)
        if (error) throw Error(error)
    },

    function(target, name) {
        const error = check.function(target, name)
        if (error) throw Error(error)
    },

    url(target, name) {
        const error = check.url(target, name)
        if (error) throw Error(error)
    }, 

    multiple(criteria) {
        const errors = check.multiple(criteria)
        if(errors.length) throw Error(errors.join('|'))
    }
}