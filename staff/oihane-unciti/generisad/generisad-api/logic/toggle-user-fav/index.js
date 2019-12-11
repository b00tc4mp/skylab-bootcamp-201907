const { models: { User, Advertisement } } = require('generisad-data')
const { validate } = require('generisad-utils')

/**
 * 
 * @param {*} userId 
 * @param {*} adId 
 * 
 * @returns {Promise}
 */

module.exports = function(userId, adId ) {

    validate.string(userId, 'userId')
    validate.string(adId, 'adId')
   

    return (async () => {
        const ad = await Advertisement.findById(adId).lean()

        if (!ad) throw new Error(`advertisement with id ${adId} does not exist`)

        const user = await User.findById(userId)

        if (!user) throw new Error(`user with id ${userId} is not found `)


        const fav = user.favorites.indexOf(adId)

        if (fav==-1) user.favorites.push(adId)
        else user.favorites.pull(adId)
       
        await user.save()
       
        debugger;

        return user.favorites
    })()
}