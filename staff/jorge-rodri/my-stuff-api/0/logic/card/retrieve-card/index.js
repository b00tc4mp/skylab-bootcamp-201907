const { User } = require('../../../data')


module.exports = function (id, idc) {
    return User.findOne({ _id: id }, { _id: 0, password: 0 }).lean()
        .then(user => {
            if (!user) throw new Error(`user with id ${id} not found.`)
            const nId = user.card.findIndex(_card => _card._id == idc)
            
            if (nId == -1) throw new Error(`card with id ${id} not found.`)
            return user.card[nId]
        })
}