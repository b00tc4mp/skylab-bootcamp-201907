const retrieveClosedOrders = require('../../logic/order/retrieve-closed-orders')

module.exports = function(req, res) {

    const { userId } = req
        
    try {
        retrieveClosedOrders(userId)
            .then((orders) => res.status(201).json({ message: `All closed orders retrieved successfully`, orders}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}