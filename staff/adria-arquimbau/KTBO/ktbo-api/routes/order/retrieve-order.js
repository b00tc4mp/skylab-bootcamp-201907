const retrieveOrder = require('../../logic/order/retrieve-order')

module.exports = function(req, res) {

    const { userId, params: { orderId }} = req
        
    try {
        retrieveOrder(userId, orderId)
            .then((order) => res.status(201).json({ message: 'Order retrieved successfully', order}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}