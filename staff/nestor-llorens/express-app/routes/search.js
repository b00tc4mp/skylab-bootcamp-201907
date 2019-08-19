const express = require('express')
const router = express.Router()

const { Html, Header, DuckResults } = require('../components')
const logic = require('../logic')

router.get('/', (req, res) => {

    const query = req.query.q

    req.session.query = query

    req.session.view = `/search?q=${query}`

    if (!req.session.userId && !req.session.token)
        logic.searchDucks(undefined, undefined, query)
        .then((ducks) => res.send(Html(`${Header(query, undefined)}${DuckResults(ducks)}`)))

    else 

    Promise.all([
        logic.retrieveUser(req.session.userId, req.session.token),
        logic.searchDucks(req.session.userId, req.session.token, query)
    ])
        .then(([user, ducks]) => res.send(Html(`${Header(query, user.name)}${DuckResults(ducks)}`)))
    
})

module.exports = router