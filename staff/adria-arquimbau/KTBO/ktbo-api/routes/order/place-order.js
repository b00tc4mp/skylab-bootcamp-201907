const placeOrder = require('../../logic/order/place-order')

module.exports = function(req, res) {

    const { userId } = req
        
    try {
        placeOrder(userId)
            .then((order) => res.status(201).json({ message: 'Order created successfully', order}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}