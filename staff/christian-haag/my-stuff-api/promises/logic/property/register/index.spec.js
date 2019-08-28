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
        cadastre = toString(Math.random() * 1000000000)
        mortgage = Math.random() >= 0.5

        return User.deleteMany()
            .then(() => User.create({ name, surname, email, password })
                .then(user => {
                    id = user.id
                    return Property.deleteMany()
                }))
    })

    ///VALIDATIONS

    //id
    it('should fail on empty id', () =>
        expect(() =>
            logic.registerProperty('', address, sqm, yearOfConstruction, cadastre, mortgage)
        ).to.throw('id is empty or blank')
    )

    it('should fail on undefined id', () =>
        expect(() =>
            logic.registerProperty(undefined, address, sqm, yearOfConstruction, cadastre, mortgage)
        ).to.throw(`id with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerProperty(123456798, address, sqm, yearOfConstruction, cadastre, mortgage)
        ).to.throw(`id with value 123456798 is not a string`)
    )

    //address
    it('should fail on empty address', () =>
        expect(() =>
            logic.registerProperty(id, '', sqm, yearOfConstruction, cadastre, mortgage)
        ).to.throw('address is empty or blank')
    )

    it('should fail on undefined address', () =>
        expect(() =>
            logic.registerProperty(id, undefined, sqm, yearOfConstruction, cadastre, mortgage)
        ).to.throw(`address with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerProperty(id, 123456798, sqm, yearOfConstruction, cadastre, mortgage)
        ).to.throw(`address with value 123456798 is not a string`)
    )

    //sqm
    it('should fail on empty sqm', () =>
        expect(() =>
            logic.registerProperty(id, address, '', yearOfConstruction, cadastre, mortgage)
        ).to.throw('sqm is empty or blank')
    )

    it('should fail on undefined sqm', () =>
        expect(() =>
            logic.registerProperty(id, address, undefined, yearOfConstruction, cadastre, mortgage)
        ).to.throw(`sqm with value undefined is not a number`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerProperty(id, address, 'sqm', yearOfConstruction, cadastre, mortgage)
        ).to.throw(`sqm with value sqm is not a number`)
    )

    //yearOfConstruction
    it('should fail on empty year', () =>
        expect(() =>
            logic.registerProperty(id, address, sqm, '', cadastre, mortgage)
        ).to.throw('yearOfConstruction is empty or blank')
    )

    it('should fail on undefined year', () =>
        expect(() =>
            logic.registerProperty(id, address, sqm, undefined, cadastre, mortgage)
        ).to.throw(`yearOfConstruction with value undefined is not a number`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerProperty(id, address, sqm, 'yearOfConstruction', cadastre, mortgage)
        ).to.throw(`yearOfConstruction with value yearOfConstruction is not a number`)
    )

    //cadastre
    it('should fail on empty cadastre', () =>
        expect(() =>
            logic.registerProperty(id, address, sqm, yearOfConstruction, '', mortgage)
        ).to.throw('cadastre is empty or blank')
    )

    it('should fail on undefined cadastre', () =>
        expect(() =>
            logic.registerProperty(id, address, sqm, yearOfConstruction, undefined, mortgage)
        ).to.throw(`cadastre with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerProperty(id, address, sqm, yearOfConstruction, 123654856, mortgage)
        ).to.throw(`cadastre with value 123654856 is not a string`)
    )

    //mortgage
    it('should fail on empty mortgage', () =>
        expect(() =>
            logic.registerProperty(id, address, sqm, yearOfConstruction, cadastre, '')
        ).to.throw('mortgage is empty or blank')
    )

    it('should fail on undefined mortgage', () =>
        expect(() =>
            logic.registerProperty(id, address, sqm, yearOfConstruction, cadastre, undefined)
        ).to.throw(`mortgage with value undefined is not a boolean`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerProperty(id, address, sqm, yearOfConstruction, cadastre, 'someString')
        ).to.throw(`mortgage with value someString is not a boolean`)
    )

    //-------------------------------

    it('should fail if user does not exist', () => {

        return logic.registerProperty('5d5d5530531d455f75da9fF9', address, sqm, yearOfConstruction, cadastre, mortgage)
            .catch(({ message }) => {
                expect(message).to.equal('user 5d5d5530531d455f75da9fF9 does not exist')
            })
    })

    it('schould register property only if user exists', () =>
        logic.registerProperty(id, address, sqm, yearOfConstruction, cadastre, mortgage)
            .then(() => {
                return Property.findOne({ cadastre })
                    .then(property => {
                        debugger
                        expect(property).to.exist
                        expect(property.owners).to.exist
                        expect(property.cadastre).to.equal(cadastre)
                    })
            })

    )

    describe('logic - add another property', () => {

        let dir = ['Requesens', 'Sant-Mori', 'Golf-plaza', 'Blv-Hill', 'Llacuna', 'Mandunga-road']
        let rand = Math.floor(Math.random() * dir.length)

        let id, name, surname, email, password, address, sqm, yearOfConstruction, cadastre, mortgage

        beforeEach(() => {
            name = `g-name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            address = dir[rand]
            sqm = Math.floor(Math.random() * ((500 - 75) + 1) + 75)
            yearOfConstruction = Math.floor(Math.random() * ((2018 - 1984) + 1) + 1984)
            cadastre = '9872023VH5797S0001WX'
            mortgage = Math.random() >= 0.5


            return User.create({ name, surname, email, password })
                .then(user => {
                    id = user.id
                    return logic.registerProperty(id, address, sqm, yearOfConstruction, cadastre, mortgage)
                })
        })

        it('should fail if property already exists', () => {
            logic.registerProperty(id, address, sqm, yearOfConstruction, cadastre, mortgage)
                .catch(({ message }) => {
                    expect(message).to.equal('property with cadastre 9872023VH5797S0001WX already exists')
                })
        })
    })

    after(() => mongoose.disconnect())
})