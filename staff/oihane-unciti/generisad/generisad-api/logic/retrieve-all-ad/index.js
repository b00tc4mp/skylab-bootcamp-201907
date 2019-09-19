const { models: { Advertisement, Merchant } } = require('generisad-data')
const { validate } = require('generisad-utils')

/**
  * Retrieve all ads.
 * 
 *
 * @param {String} domain
 * 
 * @throws {TypeError} - if domain is not a string.
 * @throws {Error} - if domain not found and there are not ads .
 * 
 * @returns {Promise}
*/

 module.exports = function(domain) {

    validate.string(domain, "domain")
    
    return (async () => {
        const merchant = await Merchant.findOne({ domain })
        if(!merchant) throw Error(`domain ${domain} not found`)
        let merchant_id = merchant._id

        const ads = await Advertisement.find( {merchant_owner : merchant_id},{ __v: 0 }).sort({_id:1}).lean() 
        if (!ads) throw Error(`there are not ads`)   
        
        return ads
    })()
}