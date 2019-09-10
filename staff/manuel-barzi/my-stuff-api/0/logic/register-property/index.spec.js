const { expect } = require('chai')
const logic = require('..')
const { database, models: { User, Property } } = require('../../data')
const { number } = require('../../utils/random')
const { random } = Math

describe('logic - register vehicle', () => {
    before(() => database.connect('mongodb://localhost/my-api-test'))

    let name, surname, email, password, id, address, m2, year, cadastre

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@domain.com`
        password = `password-${random()}`

        address = `address-${random()}`
        m2 = number(20, 500)
        year = number(1900, 2019)
        cadastre = `cadastre-${random()}`

        return User.deleteMany()
            .then(() => User.create({ name, surname, email, password }))
            .then(user => id = user.id)
    })

    it('should succeed on correct data', () =>
        logic.registerProperty(id, address, m2, year, cadastre)
            .then(_id => {
                expect(_id).to.be.a('string')

                return Promise.all([User.findById(id), Property.findById(_id)])
            })
            .then(([user, property]) => {
                expect(user).to.exist
                expect(property).to.exist

                const { owners } = property

                expect(owners).to.have.lengthOf(1)

                const [owner] = owners

                expect(user.id).to.equal(owner.toString())
                expect(property.address).to.equal(address)
                expect(property.m2).to.equal(m2)
                expect(property.year).to.equal(year)
                expect(property.cadastre).to.equal(cadastre)
            })
    )

    after(() => database.disconnect())
})