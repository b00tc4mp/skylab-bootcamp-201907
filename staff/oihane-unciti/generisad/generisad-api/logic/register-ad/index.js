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

module.exports = function(img, title, description, location) {

    validate.string(img, 'img')
    validate.string(title, 'title')
    validate.string(description, 'description') 
    validate.string(location, 'location')
    

    return (async () => {
        const product = await User.findOne({ img })
            if (product) throw new Error(`user with e-mail ${img} already exists`)
            else await Advertisement.create({img, title, description, location})
    })()    
}