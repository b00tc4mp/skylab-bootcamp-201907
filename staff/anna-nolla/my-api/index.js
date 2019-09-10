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

        logic.__users__ = users

        const { argv: [, , port = 8080] } = process

        const app = express()

        const jsonBodyParser = bodyParser.json()

        app.post('/users', jsonBodyParser, (req, res) => {
            const { body: { name, surname, email, password } } = req

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
                    .then(userId => {
                        const token = jwt.sign({ sub: id }, secret)

                        res.json({ message: 'user correctly authenticated', userId, token })
                    })
                    .catch(({ message }) => res.status(401).json({ error: message }))
            } catch ({ message }) {
                res.status(401).json({ error: message })
            }
        })

        app.get('/users/:userId', jsonBodyParser, (req, res) => {
            const { params: { userId }, headers: { authorization } } = req

            const token = authorization.slice(authorization.indexOf(' ') + 1)

            try {
                jwt.verify(token, secret)

                logic.retrieveUser(userId)
                    .then(user => res.json({ message: 'user retrieved correctly', user }))
                    .catch(({ message }) => res.status(404).json({ error: message }))
            } catch ({ message }) {
                res.status(404).json({ error: message })
            }
        })

        app.put('/users/:userId', jsonBodyParser, (req, res) =>{
            const { params: { userId }, headers: { authorization }, body: { name, surname, email, password } } = req

            const token = authorization.slice(authorization.indexOf(' ') + 1)

            try {
                jwt.verify(token, secret)
                logic.updateUser(name, surname, email, password, userId)
                    res.json({ message: 'user correctly updated' })

            } catch ({ message }) {
                res.status(400).json({ error: message})
            }
        })

        app.delete('/users/:userId', jsonBodyParser, (req, res) => {
            const { params: { userId }, headers: { authorization }, body: { password } } = req

            const token = authorization.slice(authorization.indexOf(' ') + 1)

            try{
                jwt.verify(token, secret)
                    logic.unregister(userId, password)   
            }catch ({ message }) {
                res.status(400).json({ error: message })
            }
        })

        app.listen(port)
    })
