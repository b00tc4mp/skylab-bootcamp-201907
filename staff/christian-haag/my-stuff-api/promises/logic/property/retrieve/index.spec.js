const { expect } = require('chai')
const logic = require('../../.')
const { Property } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - retrieve card', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))


    let dir = ['Requesens', 'Sant-Mori', 'Golf-plaza', 'Blv-Hill', 'Llacuna', 'Mandunga-road']
    let rand = Math.floor(Math.random() * dir.length)

    let propId, address, sqm, yearOfConstruction, cadastre, mortgage

    beforeEach(() => {

        address = dir[rand]
        sqm = Math.floor(Math.random() * ((500 - 75) + 1) + 75)
        yearOfConstruction = Math.floor(Math.random() * ((2018 - 1984) + 1) + 1984)
        cadastre = `${Math.random() * 1000000000}`
        mortgage = Math.random() >= 0.5


        return Property.deleteMany()
            .then(() => {
                return Property.create({ address, sqm, yearOfConstruction, cadastre, mortgage })
            })
            .then(property => propId = property.id)


    })

    it('should fail on empty id', () =>
        expect(() =>
            logic.retrieveProperty('')
        ).to.throw('id is empty or blank')
    )

    it('should fail on undefined id', () =>
        expect(() =>
            logic.retrieveProperty(undefined)
        ).to.throw(`id with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.retrieveProperty(123456798)
        ).to.throw(`id with value 123456798 is not a string`)
    )

    it('should fail on wrong id', () => {
        return logic.retrieveProperty(propId)
            .catch(({ message }) => {
                expect(message).to.equal('Property width given id does not exist')
            })
    })

    it('schould retireve property by id', () => {
        return logic.retrieveProperty(propId)
            .then(property => {
                expect(property).to.exist
                expect(property.id).to.equal(propId)
                expect(property.address).to.equal(address)
                expect(property.sqm).to.equal(sqm)
                expect(property.yearOfConstruction).to.equal(yearOfConstruction)
                expect(property.cadastre).to.equal(cadastre)
                expect(property.mortgage).to.equal(mortgage)
            })
    })

    after(() => mongoose.disconnect())
})
