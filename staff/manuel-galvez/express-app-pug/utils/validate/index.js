const check = require('../check')

module.exports = {

    string(target, name, empty = true, values) {
        throw Error(check.string(target, name, empty, values))
    },

    email(target, name) {
        throw Error(check.email(target, name))
    },

    function(target, name) {
        throw Error(check.function(target, name))
    },

    url(target, name) {
        throw Error(check.url(target, name))
    },

    multiple(criteria) {
        const errors = check.multiple(criteria)
        if (errors.length) throw Error(errors.join('|'))
    }
}