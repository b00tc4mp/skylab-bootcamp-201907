const { models: { Article, User } } = require('ktbo-data')
const { validate } = require('ktbo-utils')


/**
 *  This function creates a new Article.
 *  Function reserved for admins.
 *
 * @param {String} id - Identifier of the admin.
 * @param {Number} ref - Reference of the article.
 * @param {String} title - Title of the article.
 * @param {String} description - Description of the article.
 * @param {String} img - img url of the article.
 * @param {Number} quantity - Quantity of the stock.
 * @param {String} category - Category of the article / enum schema Article.
 * @param {Number} price - price of the article
 * 
 */
module.exports = function(id, ref, title, description, img, quantity, category, price) {

    validate.number(ref, 'ref')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.string(img, 'img')
    validate.number(quantity, 'quantity')
    validate.number(price, 'price')
    validate.string(category, 'category')
    validate.string(id, 'id')

    return (async () => {

        const res = await User.findOne({ _id: id })

        if(res.role === 'admin'){
            const response = await Article.findOne({ ref })
            if (response) throw new Error('Article already exists.')

            const article = await new Article({
                ref,
                title,
                description,
                img,
                quantity,
                category,
                price
            })
            await article.save()
                
            const _article = await Article.findOne({ ref })
            if (!_article) throw new Error(`Article with ref ${ref} does not exist`)
            
            return await _article._id.toString()

        } else {
            throw new Error(`User with id ${id} is not an admin`)
        }

    })()
}


