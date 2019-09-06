// const logic = require('../../logic')

// module.exports = (req, res) => {

//     const {  userId } = req
//     try {
//         logic.deleteChat(userId)
//             .then(() => res.json({ message: 'Chat deleted successfully'}))
//             .catch(({ message }) => res.status(404).json({ error: message }))
//     } catch({ message }) {
//         res.status(404).json({ error: message })
//     }
// }