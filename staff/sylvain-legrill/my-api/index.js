const express = require('express')
const bodyParser = require('body-parser')
const logic = require('./logic')
const { MongoClient } = require('mongodb')
const jwt = require('jsonwebtoken')



//el useNewUrlParser creiem! que es un parametre per desactivar el default parser de mongo i usar el que li diem aki
const client = new MongoClient('mongodb://localhost', { useNewUrlParser: true, useUnifiedTopology: true })



//secret es una password que te de coincidir aqui amb a la logica
const secret = "uni dori teri cateri mata la veri veri viro"



client.connect()
    .then(() => {
        debugger
        const db = client.db('my-api')
        const users =  db.collection('users')
        logic.__users__ = users
        const { argv: [,, port = 7080] } = process
        const app = express()
        const jsonBodyParser = bodyParser.json()

        
        app.post('/user', jsonBodyParser, (req, res) => {
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

        // app.put('/user/:id', jsonBodyParser, (req, res) => {         //UPDATE-USER
        //     const { params: { id }, headers: { authorization } } = req
        //     const token = authorization.slice(authorization.indexOf(' ') + 1)
        //     try {
        //         jwt.verify(token, secret)
        //         //const token = jwt.sign({ sub: id }, secret)
        //         logic.updateUser(id, )
        //             .then(id => {
        //                 res.json({ message: `user with id ${id} correctly updated` })
        //             })
        //             .catch(({ message }) => res.status(400).json({ error: message }))
        //     } catch ({ message }) {
        //         res.status(400).json({ error: message })
        //     }
        // })


        app.put('/user/:id', jsonBodyParser, (req, res) => {
            debugger
            const { body } = req
            
            const { params: { id }, headers: { authorization } } = req
            const token = authorization.slice(authorization.indexOf(' ') + 1)
            try {
                jwt.verify(token, secret)
                logic.updateUser(id, body)
                    .then(response => {
                        if(response.result.nModified == 0)
                            res.json({ message: `User with id ${id} has not been updated`})
                        else
                            res.json({ message: `User with id ${id} correctly updated`})
                        })
                    .catch(({ message }) => res.status(404).json({ error: message }))
            } catch ({ message }) {
                res.status(404).json({ error: message })
            }
        
        })
        app.delete('/user/:id', jsonBodyParser, (req, res) => {
        
            const { params: { id },  headers: { authorization } } = req
            const token = authorization.slice(authorization.indexOf(' ') + 1)
            try {
                jwt.verify(token, secret)
                logic.removeUser(id)
                    .then(()  => res.json({ message: 'User deleted'}))
                    .catch(({ message }) => res.status(404).json({ error: message })) //mirar que posar
            } catch ({ message }) {
                res.status(404).json({ error: message })
            }
        })

        app.listen(port)
    })