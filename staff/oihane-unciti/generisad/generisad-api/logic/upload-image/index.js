require('dotenv').config()

const { validate } = require('generisad-utils')
const { models: { Advertisement } } = require('generisad-data')
const { models: { User } } = require('generisad-data')

const cloudinary = require('cloudinary')

const { env: { CLOUDINARY_API_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRET_KEY } } = process

/**
* Update user information.
* 
* @param {String} adId 
* @param {Stream} image
* 
* @throws {TypeError} - if userId is not a string or buffer is not a buffer.
* @throws {Error} - if any param is empty, user is not found or image could not be uploaded.
*
* @returns {Object} - user.  
*/

module.exports = function (userId, adId, image) {
    validate.string(userId, 'userId')
    validate.string(adId, 'adId')
    validate.object(image, 'stream');

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new Error(`user with userId ${userId} not found`)

        const ad = await Advertisement.findById(adId)
        if (!ad) throw new Error(`ad with adId ${adId} not found`)

        cloudinary.config({
            cloud_name: CLOUDINARY_NAME,
            api_key: CLOUDINARY_API_KEY,
            api_secret: CLOUDINARY_SECRET_KEY
        })

        const _image = await new Promise((resolve, reject) => {

            const upload_stream = cloudinary.v2.uploader.upload_stream((err, image) => {
                if (err) return reject(err)

                resolve(image)
            })

            image.pipe(upload_stream)
        })

        console.log(_image.secure_url);

        await Advertisement.findByIdAndUpdate(adId, { image: _image.secure_url }, { new: true, runValidators: true })
    })()
}