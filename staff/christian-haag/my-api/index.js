const express = require('express')
const bodyParser = require('body-parser')
const logic = require('./logic')
const { MongoClient } = require('mongodb')
const jwt = require('jsonwebtoken')

const client = new MongoClient('mongodb://localhost', { useNewUrlParser: true, useUnifiedTopology: true })

const secret = "s3cr3t w0rt"

client.connect()
    .then(() => {
        const db = client.db('my-api')

        const users = db.collection('users')

        logic.__users__ = users

        const { argv: [, , port] } = process

        const app = express()

        const jsonBodyParser = bodyParser.json()

        app.post('/users', jsonBodyParser, (req, res) => {
            const { body: { name, surname, email, password } } = req

            try {
                logic.registerUser(name, surname, email, password)
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
        app.listen(port)
    })