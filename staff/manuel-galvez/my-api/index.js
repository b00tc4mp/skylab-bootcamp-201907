require('dotenv').config()

const express = require('express')
const logic = require('./logic')
const data = require('./data')
const { name, version } = require('./package')
const routes = require('./routes')

const { env: { PORT, DB_URL, DB_NAME } } = process

let client

data(DB_URL, DB_NAME)
    .then(connection => {
        const { client: _client, db } = connection
        client = _client

        const users = db.collection('users')

        logic.__users__ = users

        const app = express()

        // Middleware to manage routes
        app.use('/api', routes)

        app.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`)) 
    })

process.on('SIGINT', () => {
    console.log(`\n${name} ${version} shutting down, disconnecting from db...`)

    client.close()
    
    process.exit(0)
})
        

/*
        app.get('/user/:id', (req, res) => {

            const { params: { id }, headers: { authorization } } = req

            const token = authorization.slice(authorization.indexOf(' ') + 1)

            try {
                jwt.verify(token, secret)

                logic.retrieveUser(id)
                    .then(user => res.json({ message: 'User retrieved successfully', user }))
                    .catch(({ message }) => res.status(404).json({ error: message }))
            } catch({ message }) {
                res.status(404).json({ error: message })
            }
        })

        app.delete('/user/:id', jsonBodyParser, (req, res) => {

            const { params: { id }, headers: { authorization }, body: { email, password } } = req

            const token = authorization.slice(authorization.indexOf(' ') + 1)

            try {
                jwt.verify(token, secret)

                logic.unregisterUser(id, email, password)
                    .then(() => res.json({ message: 'User unregistered successfully'}))
                    .catch(({ message }) => res.status(404).json({ error: message }))
            } catch({ message }) {
                res.status(404).json({ error: message })
            }
        })


        app.put('/user/:id', jsonBodyParser, (req, res) => {

            const { params: { id }, headers: { authorization }, body } = req

            const token = authorization.slice(authorization.indexOf(' ') + 1)

            try {
                jwt.verify(token, secret)

                logic.updateUser(id, body)
                    .then(() => res.json({ message: 'User updated successfully'}))
                    .catch(({ message }) => res.status(400).json({ error: message }))
            } catch({ message }) {
                res.status(404).json({ error: message })
            }
        })


    app.listen(port)
    */







