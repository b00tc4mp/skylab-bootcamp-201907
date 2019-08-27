const validate = require('../../../utils/validate')
const { Vehicle } = require('../../../data')

/**
 * @param {*} id 
 * 
 * @returns {Promise}
*/

module.exports = function (id) {

    validate.string(id, 'id')

    return Vehicle.find({ owner: id }, { __v: 0 }).lean()
        .then(vehicles => {
            if (!vehicles) throw new Error('no vehicles found for this user id')
            vehicles.forEach(vehicle => {
                vehicle.id = vehicle._id
                //WTF, why delete?
                delete vehicle._id
            })
        })
}
