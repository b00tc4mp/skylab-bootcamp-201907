const { models: { Advertisement, Merchant } } = require('generisad-data')
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

        const ads = await Advertisement.find({owner :userId, merchant_owner : merchant_id},{ __v: 0 }).lean();
            if (!ads) throw Error(`User does not have an ad with ad id`)
            else {
                return ads
            }
    })()
}