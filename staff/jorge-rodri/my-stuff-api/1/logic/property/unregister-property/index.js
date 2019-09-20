const { Property } = require('../../../data')
/**
 * Unregisters a user.
 * 
 * @param {string} id
 * @param {string} password
 * 
 * @returns {Promise}
 */
module.exports = function (idU, idP, cadastre) {
    return Property.findOne({})
        .then(prop => {
            let arr = prop.owners.toString().split(',')
            
            if (!arr.includes(idU)) throw new Error(`User with id ${id} not found`)
            return Property.deleteOne({ _id: idP, cadastre })
                .then(result => {
                    if (!result.deletedCount) throw new Error(`wrong credentials`)
                })
        })

}