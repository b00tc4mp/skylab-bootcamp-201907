const { models: { Advertisement } } = require('generisad-data')
const { validate } = require('generisad-utils')

/**
 * 
 * @param {String} adId
 * @param {String} id 
 *
 * 
 * @returns {Promise}
 */

module.exports = function(adId, id) {

    validate.string(adId, 'Advertisement id')
    validate.string(id, 'user id')

    return (async () => {
        const user = await User.findById(id)
            if(!user) throw new Error (`user with id ${id} does not exist`)
            else{
                const ad = await Advertisement.findById(adId)
                    if(!ad) throw new Error(`advertisement with id ${adId} does not exist`)
                    else{
                        if(!ad.owner.includes(id)) throw new Error (`user with id ${id} is not owner of advertisement with id ${adId}`)
                        else return Advertisement.deleteOne({ _id : adId })
                    }   
            }
    })()
}