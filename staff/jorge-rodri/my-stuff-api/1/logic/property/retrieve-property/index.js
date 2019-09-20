const { Property } = require('../../../data')

/**
 * Retrieves a user by its id.
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
 */
module.exports = function (id) {

    return (async () => {
        const prop = await Property.findOne({}).lean()
        let arr = prop.owners.toString().split(',')

        if (!arr.includes(id)) throw new Error(`User with id ${id} not found`)

        const property = await Property.findOne({ owners: arr[0] })

        if (!property) throw new Error(`vehicle with id ${property._id} not found`)
        return property
    })()
}