require('dotenv').config()

const validate = require('../../../utils/validate')
const { models } = require('democratum-data')
const { User } = models
const streamifier = require('streamifier')
const cloudinary = require('cloudinary')

const { CLOUDINARY_API_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRET_KEY } = require('../config')

/**
* Update user information.
* 
* @param {String} userId 
* @param {Buffer} buffer 
* 
* @throws {TypeError} - if userId is not a string or buffer is not a buffer.
* @throws {Error} - if any param is empty, user is not found or image could not be uploaded.
*
* @returns {Object} - user.  
*/

module.exports = function (userId, buffer) {

    validate.string(userId, 'user id')
    validate.object(buffer, 'buffer');

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new Error(`user with userId ${userId} not found`)

        cloudinary.config({
            cloud_name: CLOUDINARY_NAME,
            api_key: CLOUDINARY_API_KEY,
            api_secret: CLOUDINARY_SECRET_KEY
            })
        
        const image = await new Promise((resolve, reject) => {

            const upload_stream = cloudinary.uploader.upload_stream((err,image) => {

                if (err) return reject (`Image could not be uploaded: ${err}`)

                resolve(image)
            })
            streamifier.createReadStream(buffer).pipe(upload_stream)
        })

        let _user = await User.findByIdAndUpdate(userId, { image: image.secure_url }, { new: true, runValidators: true }).select('-__v -password').lean()
        
        _user.id = user._id.toString()
        delete _user._id

        return _user
    })()
}
      