const express = require('express')
const bodyParser = require('body-parser')
const logic = require('./logic')
const { MongoClient } = require('mongodb')
const jwt = require('jsonwebtoken')

const client = new MongoClient('mongodb://localhost', { useNewUrlParser: true, useUnifiedTopology: true })

const secret = "en realidad son uruguayo (juanpi), o sea, un vendido"

client.connect()
    .then(() => {
        const db = client.db('my-api')

        const users = db.collection('users')

        logic.__users__ = users // Asignamos la BBDD a la lógica

        const { argv: [, , port = 8080] } = process // NODE

        const app = express() // Creamos el server

        const jsonBodyParser = bodyParser.json() // Creamos el moddleware

        app.post('/user', jsonBodyParser, (req, res) => {
            const { body: { name, surname, email, password, repassword } } = req

            try {
                logic.registerUser(name, surname, email, password, repassword)
                    .then(() => res.status(201).json({ message: 'user correctly registered' }))
                    .catch(({ message }) => res.status(400).json({ error: message }))
            } catch ({ message }) {
                res.status(400).json({ error: message })
            }
        })

        app.post('/auth', jsonBodyParser, (req, res) => {
            const { body: { email, password } } = req

            try {
                logic.authenticateUser(email, password)
                    .then(id => {
                        const token = jwt.sign({ sub: id }, secret)

                        res.json({ message: 'user correctly authenticated', id, token })
                    })
                    .catch(({ message }) => res.status(401).json({ error: message }))
            } catch ({ message }) {
                res.status(401).json({ error: message })
            }
        })

        app.get('/user/:id', jsonBodyParser, (req, res) => {
            const { params: { id }, headers: { authorization } } = req

            const token = authorization.slice(authorization.indexOf(' ') + 1)

            try {
                jwt.verify(token, secret)

                logic.retrieveUser(id)
                    .then(user => res.json({ message: 'user retrieved correctly', user }))
                    .catch(({ message }) => res.status(404).json({ error: message }))
            } catch ({ message }) {
                res.status(404).json({ error: message })
            }
        })

        app.delete('/user/:id', jsonBodyParser, (req, res) => {
            const { params: { id }, feaders: { autorization } } = req
            const token = autorization.slice(autorization.indexOf(' ') + 1)

            try {
                jwt.verify(token, secret)
                logic.unregisterUser(id)
                    .then(() => res.json({ message: 'unregegister user' }))
                    .catch(({ message }) => res.status(404).json({ error: message }))
            } catch ({ message }) {
                res.status(404).json({ error: message })
            }

        })

        app.listen(port)
    })
