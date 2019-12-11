const { models: { User, Merchant } } = require('generisad-data')
const { validate } = require('generisad-utils')

/**
  * Retrieve favorites by the userId and domain.
 * 
 * 
 * @param {String} userId  
 * @param {String} domain
 * 
 * @throws {TypeError} - if userId and domain is not a string.
 * @throws {Error} - if user already exist in this domain .
 * 
 * @returns {Promise}
*/


module.exports = function(userId, domain) {

    validate.string(userId, "userId")
    validate.string(domain, "domain")

    return (async () => { 

        const merchant = await Merchant.findOne({ domain })
        if(!merchant) throw Error(`domain ${domain} not found`)
        let merchant_id = merchant._id

        const res = await User.findOne({_id:userId, merchant_owner : merchant_id}).populate('favorites').lean()

        if(!res) throw Error(`User with id ${userId} does not exist.`)

        return res

    
    })()
}
