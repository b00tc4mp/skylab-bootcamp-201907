const addToCart = require('../../logic/cart/add-to-cart')

module.exports = function(req, res) {

    const { userId, body: { articleId, quantity } } = req
    
    try {
        addToCart(userId, articleId, quantity)
            .then((cart) => res.status(201).json({ message: 'Article added to cart successfully', cart}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}