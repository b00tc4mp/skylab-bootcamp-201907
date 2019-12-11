const { validate } = require('wannadog-utils')
const { models } = require('wannadog-data')
const { User } = models

/**
 * Updates user information
 * 
 * @param {string} id
 * @param {object} fieldsToUpdate
 * @param {string} name
 * @param {string} surname
 * @param {string} email
 * @param {string} password
 * @param {number} coordinates
 * 
 * @returns {Promise}
*/
module.exports = function (id, fieldsToUpdate) {

    if (fieldsToUpdate.name) validate.string(fieldsToUpdate.name, 'name')
    if (fieldsToUpdate.surname) validate.string(fieldsToUpdate.surname, 'surname')
    if (fieldsToUpdate.email) validate.string(fieldsToUpdate.email, 'email')
    if (fieldsToUpdate.email) validate.email(fieldsToUpdate.email, 'email')
    if (fieldsToUpdate.password) validate.string(fieldsToUpdate.password, 'password')
    if (fieldsToUpdate.longitude) validate.number(fieldsToUpdate.longitude, 'longitude')
    if (fieldsToUpdate.latitude) validate.number(fieldsToUpdate.latitude, 'latitude')
    validate.string(id, 'id')

    return (async () => {
        const user = await User.findByIdAndUpdate(id, { $set: fieldsToUpdate })
        if (!user) throw Error(`User with id ${id} does not exist.`)
    })()
}