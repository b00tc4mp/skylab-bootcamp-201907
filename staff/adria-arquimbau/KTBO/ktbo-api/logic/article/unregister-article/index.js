const { models: { User, Article } } = require('ktbo-data')
const { validate } = require('ktbo-utils')

/**
 *  Unregister an Article.
 *  Function reserved for an admins.
 *
 * @param {String} articleId - Identifier of the article.
 * @param {String} userId - Identifier of the admin.
 * @param {String} password - Admin's password.
 * 
 */

module.exports = function (articleId, userId, password) {

    validate.string(articleId, 'articleId')
    validate.string(userId, 'userId')
    validate.string(password, 'password')

    return (async () => {

        const user = await User.findOne({ _id: userId })
        if(!user) throw new Error(`There is not a user with id ${userId}`)

        if(user.role === 'admin'){
            //TODO bcrypt match
            //if(user.password !== password) throw new Error(`Wrong password`)
            await Article.deleteOne({ _id: articleId})

        } else {
            throw new Error(`User with id ${userId} is not an admin`)
        }

    })()
}