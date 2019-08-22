const express = require('express')
const router = express.Router()

const { Html, Header, Favorites } = require('../components')
const logic = require('../logic')

router.get('/', (req, res) => {
    
    const { session: {query} } = req

    const { userId, token } = req.session

    const view = req.session.view

    req.session.view = 'favorites'

    Promise.all([
        logic.retrieveUser(userId, token),
        logic.retrieveFavDucks(userId, token)
    ])
        .then(([user, ducks]) => res.send(Html(`${Header(query, user.name, req.session.view)}${Favorites(ducks, view)}`)))

})

module.exports = router


