require('dotenv').config()
const { validate } = require('wannadog-utils')
const { models } = require('wannadog-data')
const { User, Dog } = models
const cloudinary = require('cloudinary')
const { env: { CLOUDINARY_API_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRET_KEY } } = process
/**
* Update user information.
* 
* @param {String} dogId 
* @param {Stream} image
* 
* @throws {TypeError} - if userId is not a string or buffer is not a buffer.
* @throws {Error} - if any param is empty, user is not found or image could not be uploaded.
*
* @returns {Object} - user.  
*/
module.exports = function (userId, dogId, image) {
    validate.string(userId, 'userId')
    validate.string(dogId, 'dogId')

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new Error(`user with userId ${userId} not found`)
        const dog = await Dog.findById(dogId)
        if (!dog) throw new Error(`dog with dogId ${dogId} not found`)
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
        await Dog.findByIdAndUpdate(dogId, { image: _image.secure_url }, { new: true, runValidators: true })
    })()
}