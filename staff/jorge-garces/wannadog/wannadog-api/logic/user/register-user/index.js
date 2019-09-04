const { validate } = require('wannadog-utils')
const { models } = require('wannadog-data')
const { User } = models

/**
 * Registers a user
 * 
 * @param {string} name
 * @param {string} surname
 * @param {string} email
 * @param {string} password
 * @param {number} longitude
 * @param {number} latitude
 * 
 * @returns {Promise}
 */

module.exports = function (name, surname, email, password, longitude, latitude) {

    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')
    validate.number(longitude, 'longitude')
    validate.number(latitude, 'latitude')

    return (async () => {

        const user = await User.findOne({ email })
        if (user) throw Error('User already exists.')
        const newUser = new User({ name, surname, email, password })
        newUser.location.coordinates.push(longitude, latitude)
        await newUser.save()
    })()
}