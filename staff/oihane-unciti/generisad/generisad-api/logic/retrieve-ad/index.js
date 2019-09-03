const { models: { Advertisement } } = require('generisad-data')
const { validate } = require('generisad-utils')

/**
 * 
 * @param {String} img
 * @param {String} product 
 * @param {String} description 
 * @param {String} location 
 * 
 * @returns {Promise}
 */

module.exports = function(adId) {
    validate.string(adId, 'Advertisement id')

    return (async () => { 
        const ad = await Advertisement.findById(adId).lean()
            if (!ad) throw Error(`Advertisement with id ${adId} does not exist.`)
            else {
                ad.id = adId 
                return ad
            }
    })()
}