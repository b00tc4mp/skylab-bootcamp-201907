const changeOrderState = require('../../logic/order/change-order-state')

module.exports = function(req, res) {

    const { userId, params: { orderId }} = req
        
    try {
        changeOrderState(userId, orderId)
            .then((order) => res.status(201).json({ message: 'Order state changed successfully to closed', order}))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}