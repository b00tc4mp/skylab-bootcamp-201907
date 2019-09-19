const { models: { Article, User } } = require('ktbo-data')
const { validate } = require('ktbo-utils')

/**
 * 
 * @param {*} ref 
 * @param {*} title 
 * @param {*} description 
 * @param {*} img 
 * @param {*} quantity 
 * @param {*} category 
 * 
 * @returns {Promise}
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


