const  mongoose = require('mongoose')


/**
 * Updates a user.
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Promise}
 */

const {models: {User}}= require("../../data")
module.exports = function (id, data) {
    // TODO validate fields
    debugger
    const ida= mongoose.Types.ObjectId(id)

    return User.updateOne({ _id: ida }, { $set: data })
        .then(data => {
            debugger
            if (!data.n) throw new Error(`user with id ${id} does not exist`)
        })
}