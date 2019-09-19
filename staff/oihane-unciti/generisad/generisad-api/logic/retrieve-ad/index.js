const { models: { Advertisement } } = require('generisad-data')
const { validate } = require('generisad-utils')

/**
  * Retrieve advertisement
 * 
 * 
 * @param {String} - advertisement id
 * 
 * @throws {TypeError} - if id is not a string.
 * @throws {Error} - if advertisement does not exist .
 * 
 * @returns {Promise}
 * @returns {Object} advertisement object
*/


module.exports = function(adId) {
    
    validate.string(adId, "ad id")

    

    return (async () => {
        const ad = await Advertisement.findById(adId)
            if (!ad) throw Error(`Advertisement with id ${adId} does not exist.`)
            else {
                ad.id = adId
                return ad
            }
    })()
}