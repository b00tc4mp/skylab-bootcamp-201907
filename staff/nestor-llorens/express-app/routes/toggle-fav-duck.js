const express = require('express')
const router = express.Router()

const logic = require('../logic')

router.post('/', (req, res) => {
    const { body: { id }, session: { userId, token} } = req

    if (userId && token)
        logic.toggleFavDuck(userId, token, id)
        .then(() => res.redirect(req.session.view))

    else res.redirect('/login')

})

module.exports = router