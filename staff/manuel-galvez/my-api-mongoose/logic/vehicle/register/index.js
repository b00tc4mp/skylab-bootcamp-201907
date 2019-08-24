const validate = require('../../../utils/validate')
const { User, Vehicle } = require('../../../models')

/**
 * 
 * @param {*} make 
 * @param {*} model 
 * @param {*} year 
 * @param {*} type 
 * @param {*} color 
 * @param {*} electric 
 * @param {*} id 
 * 
 * @returns {Promise}
 */

module.exports = function(make, model, year, type, color, electric, id) {

    /*validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'username')
    validate.email(email, 'username')*/
    
    return User.findOne({ _id: id })
        .then(user => {
            if (!user) throw Error('User does not exist exists.')
            const vehicle = new Vehicle({
                make, 
                model,
                year,
                type,
                color,
                electric, 
            })
            vehicle.owner.push(id)
            vehicle.save()
        }).then(() => { })
}