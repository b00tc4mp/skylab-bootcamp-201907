const retrieveAllOrders = require('../../logic/order/retrieve-all-orders')

module.exports = function(req, res) {

    const { userId } = req
        
    try {
        retrieveAllOrders(userId)
            .then((orders) => res.status(201).json({ message: `All orders retrieved successfully`, orders}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}