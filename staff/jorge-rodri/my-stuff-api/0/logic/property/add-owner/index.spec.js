const { expect } = require('chai')
const logic = require('..')
const { User, Property } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - add owner', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, id, address, m2, year, cadastre, owners

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        return User.deleteMany()
            .then(() => User.create({ name, surname, email, password }))
            .then(user => id = user.id)
    })


    beforeEach(() => {
        address = `name-${Math.random()}`
        m2 = Math.random()
        year = Math.random()
        cadastre = `cadastre-${Math.random()}`
        owners = [id]

        return Property.deleteMany()
            .then(() => Property.create({ address, m2, year, cadastre, owners }))
    })

    it('should succeed on correct data', () => {
        const ide = '5d5d5530531d455f75da9ff9'
        return logic.addOwner(owners, ide, cadastre)
            .then(result => {
                debugger
                expect(result).to.not.exist
                return Property.findOne({ cadastre })
                    .then(prop => {
                        debugger
                        const confirm = prop.owners.find(owner => owner._id == ide)
                        debugger
                        expect(confirm.toString()).to.equal(ide)
                    })
            })
    }
    )

    after(() => mongoose.disconnect())
})