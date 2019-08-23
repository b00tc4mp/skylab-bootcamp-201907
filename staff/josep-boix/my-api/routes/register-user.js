const logic = require('../logic')

module.exports = function (req, res) {
    const { body: { name, surname, email, password, repassword } } = req

    try {
        logic.registerUser(name, surname, email, password, repassword)
            .then(() => res.status(201).json({ message: 'user correctly registered' }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
} 

// throw new Error("hola") --> catch({ message }){ /*haces cosas*/ }