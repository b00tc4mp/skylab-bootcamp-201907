const { models: { User, Article } } = require('ktbo-data')
const { validate } = require('ktbo-utils')
/**
 * Unregisters a user.
 * 
 * @param {string} id
 * @param {string} password
 * 
 * @returns {Promise}
 */
module.exports = function (articleId, userId, password) {
    validate.string(articleId, 'articleId')
    validate.string(userId, 'userId')
    validate.string(password, 'password')

    return (async () => {

        const user = await User.findOne({ _id: userId })

        if(!user) throw new Error(`There is not a user with id ${userId}`)

        if(user.role === 'admin'){
            if(user.password !== password) throw new Error(`Wrong password`)

            await Article.deleteOne({ _id: articleId})

        } else {
            throw new Error(`User with id ${userId} is not an admin`)
        }
    })()
}