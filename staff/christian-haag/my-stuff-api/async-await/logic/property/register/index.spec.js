const { expect } = require('chai')
const logic = require('../../.')
const { Property, User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - add property', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))


    let dir = ['Requesens', 'Sant-Mori', 'Golf-plaza', 'Blv-Hill', 'Llacuna', 'Mandunga-road']
    let rand = Math.floor(Math.random() * dir.length)

    let id, name, surname, email, password, address, sqm, yearOfConstruction, cadastre, mortgage

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`


        address = dir[rand]
        sqm = Math.floor(Math.random() * ((500 - 75) + 1) + 75)
        yearOfConstruction = Math.floor(Math.random() * ((2018 - 1984) + 1) + 1984)
        cadastre = Math.random() * 1000000000
        mortgage = Math.random() >= 0.5

        return User.deleteMany()
            .then(() => User.create({ name, surname, email, password })
                .then(user => {
                    id = user.id
                    return Property.deleteMany()
                }))
    })

    it('should fail if user does not exist', () => {

        return logic.property.register('5d5d5530531d455f75da9fF9', address, sqm, yearOfConstruction, cadastre, mortgage)
            .catch(({ message }) => {
                expect(message).to.equal('user 5d5d5530531d455f75da9fF9 does not exist')
            })
    })

    it('schould add register only if user exists', () =>
        logic.property.register(id, address, sqm, yearOfConstruction, cadastre, mortgage)
            .then(() => {
                return Property.findOne({ cadastre }).lean()
                    .then(property => {
                        debugger
                        expect(property).to.exist
                        expect(property.owners).to.exist
                        expect(Number(property.cadastre)).to.equal(cadastre)
                    })
            })

    )
    after(() => mongoose.disconnect())
    // describe('logic - add another card', () => {

    //     let id, name, surname, email, password, cardBrand, cardType, cardNumber, expiry

    //     beforeEach(() => {
    //         name = `g-name-${Math.random()}`
    //         surname = `surname-${Math.random()}`
    //         email = `email-${Math.random()}@domain.com`
    //         password = `password-${Math.random()}`

    //         cardBrand = 'Visa'
    //         cardType = 'Credit'
    //         cardNumber = Math.floor(Math.random() * 9999999999999999)
    //         expiry = new Date

    //         number2 = 1254658912561234


    //         return User.create({ name, surname, email, password })
    //             .then(user => {
    //                 id = user.id
    //                 return logic.addNewCard(id, cardBrand, cardType, cardNumber, expiry)
    //             })

    //     })

    //     it('should add a second card', () =>
    //         logic.addNewCard(id, cardBrand, cardType, number2, expiry)
    //             .then(() => {
    //                 return User.findOne({ _id: id }).lean()
    //                     .then(result => {
    //                         const { cards } = result
    //                         expect(result).to.exist
    //                         expect(cards).to.exist
    //                         expect(cards[1].number).to.equal(number2)
    //                     })
    //             })
    //     )

    //     it('should fail if card number already exists', () => {
    //         logic.addNewCard(id, cardBrand, cardType, cardNumber, expiry)
    //             .then(result => {
    //                 expect(result).to.undefined
    //             })

    //     })
    // })

})