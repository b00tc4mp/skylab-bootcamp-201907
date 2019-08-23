const express = require('express')
const router = express.Router()

const { Html, Header, DuckDetail } = require('../components')
const logic = require('../logic')

router.get(`/:id`, (req, res) => {
    const { params: { id: duckId }, session: { userId, token, query } } = req

    if (req.session.view === undefined) req.session.view = '/'

    const view = req.session.view
    req.session.view = `/detail/${duckId}`

    if (userId && token)
        Promise.all([
            logic.retrieveUser(userId, token),
            logic.retrieveDuck(userId, token, duckId)
        ])
            .then(([user, duck]) => res.send(Html(`${Header(query, user.name)}${DuckDetail(duck, view)}`)))

    else
        logic.retrieveDuck(undefined, undefined, duckId)
            .then(duck => res.send(Html(`${Header()}${DuckDetail(duck, view)}`)))
})

module.exports = router