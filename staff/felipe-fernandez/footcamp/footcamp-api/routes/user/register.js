const logic = require('../../logic')

module.exports = async function(req, res) {

    const { body: {name, surname, email, password } } = req

    try {
        debugger
       await logic.registerUser(name, surname, email, password)
           res.status(201).json({ message: 'User registered successfully'})
    } catch({ message }) {
        res.status(400).json({ error: message })
    }
}