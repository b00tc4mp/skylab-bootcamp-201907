const { models: { User,Mail, Merchant } } = require('generisad-data')
const { validate } = require('generisad-utils')

/**
 * 
 * @param {String} userId
 *
 * 
 * @returns {Promise}
 */

module.exports = function(userId, domain) {

    validate.string(userId ,"userId")
    validate.string(domain ,"domain")

    return (async () => { 

        const merchant = await Merchant.findOne({ domain })
        if(!merchant) throw Error(`domain ${domain} not found`)
        let merchant_id = merchant._id

        const user = await User.findById(userId)
        if (!user) throw Error(`user with id ${userId} not found`)

        const mail = await Mail.find({$and:[{receiver: userId},{read:false},{merchant_owner:merchant_id}]})
            if (!mail) throw Error(`There are not message`)
            else {
               return mail
            }
    })()
}