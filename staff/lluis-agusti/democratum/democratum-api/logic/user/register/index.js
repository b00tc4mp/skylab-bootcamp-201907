const validate = require('../../../utils/validate')
const { Citizen } = require('../../../models')

/**
 * 
 * @param {String} fullname 
 * @param {String} address
 * @param {String} documentId
 * @param {String} email
 * @param {String} imgDocId
 * @param {String} password
 * @param {Array} participatedPolls
 * 
 * @returns {Promise}
 */

module.exports = function(fullname, address, documentId, email, imgDocId, password, participatedPolls) {

/*     validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'username')
    validate.email(email, 'username') */
    
    return (async () => {
        const citizen = await Citizen.findOne({ email })
        
        if (citizen) throw Error('User already exists.')
            
        await Citizen.create({fullname, address, documentId, email, imgDocId, password, participatedPolls})

        return citizen
    })()
}