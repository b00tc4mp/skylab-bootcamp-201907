const { models: { Advertisement, Merchant } } = require('generisad-data')
const { validate } = require('generisad-utils')

/**
 * 
 * @param {String} query
 * 
 * @returns {Promise}
*/

module.exports = function(query, domain) {


    
    validate.string(query, 'query')
    validate.string(domain ,"domain")

    return (async () => {


        const merchant = await Merchant.findOne({ domain })
        if(!merchant) throw Error(`domain ${domain} not found`)
        let merchant_id = merchant._id
        const ads = await Advertisement.find( {"title": { "$regex": `${query}`, "$options": "i" }, merchant_owner:merchant_id},{ __v: 0 }).sort({_id:1}).lean()
        if (!ads) throw Error(`there are not ads with query ${query}`)   
      
        
        return ads
    })()
}