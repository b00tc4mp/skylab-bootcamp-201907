const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Property } = require('../../../models')

describe('logic - register property', () => {

    before(() => mongoose.connect('mongodb://localhost/my-stuff-api-test', { useNewUrlParser: true }))

    let id, address, m2, year, cadastre

    beforeEach(() => {

        address = `address-${Math.random()}`
        m2 = Number((Math.random() * (250 - 45) + 45).toFixed())
        year = Number((Math.random() * (2019-1980) + 1980).toFixed())
        cadastre = `cadastre-${Math.random()}`

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`

        return (async () => {
            const user =  await User.create({ name, surname, email, password })
            id =  user.id
        })()
    })

    it('should succeed on correct data', async () => {
        let property = await logic.property.register(id, address, m2, year, cadastre)
        expect(property).to.exist
        property = await Property.findOne({ cadastre })
        expect(property).to.exist
        expect(property.address).to.equal(address)
        expect(property.m2).to.equal(m2)
        expect(property.year).to.equal(year)
        expect(property.cadastre).to.equal(cadastre)
    })

    it('should fail if the property already exists', async () => {
       await Property.create({ id, address, m2, year, cadastre })
       try {
            await logic.property.register(id, address, m2, year, cadastre)
       } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal(`Property already exists.`)
       }
    })

    /* Address */
    it('should fail on empty address', () => 
        expect(() => 
               logic.property.register(id, '', m2, year, cadastre)
    ).to.throw('address is empty or blank')
    )

     it('should fail on undefined name', () => 
        expect(() => 
               logic.property.register(id, undefined, m2, year, cadastre)
    ).to.throw(`address with value undefined is not a string`)
    )

     it('should fail on wrong data type for name', () => 
        expect(() => 
               logic.property.register(id, 123, m2, year, cadastre)
    ).to.throw(`address with value 123 is not a string`)
    )

      /* m2 */
    it('should fail on empty m2', () => 
        expect(() => 
               logic.property.register(id, address, '', year, cadastre)
    ).to.throw('m2 is empty or blank'))

     it('should fail on undefined m2', () => 
        expect(() => 
               logic.property.register(id, address, undefined, year, cadastre)
    ).to.throw(`m2 with value undefined is not a number`)
    )

     it('should fail on wrong data type for m2', () => 
        expect(() => 
               logic.property.register(id, address, 'aaa', year, cadastre)
    ).to.throw(`m2 with value aaa is not a number`)
    )

    /* year */
    it('should fail on empty year', () => 
        expect(() => 
               logic.property.register(id, address, m2, '', cadastre)
    ).to.throw('year is empty or blank')
    )

     it('should fail on undefined year', () => 
        expect(() => 
               logic.property.register(id, address, m2, undefined, cadastre)
    ).to.throw(`year with value undefined is not a number`)
    )

     it('should fail on wrong data type for year', () => 
        expect(() => 
               logic.property.register(id, address, m2, 'aaa', cadastre)
    ).to.throw(`year with value aaa is not a number`)
    )

    /* cadastre */
    it('should fail on empty cadastre', () => 
        expect(() => 
               logic.property.register(id, address, m2, year, '')
    ).to.throw('cadastre is empty or blank')
    )

     it('should fail on undefined cadastre', () => 
        expect(() => 
               logic.property.register(id, address, m2, year, undefined)
    ).to.throw(`cadastre with value undefined is not a string`)
    )

     it('should fail on wrong data type for cadastre', () => 
        expect(() => 
               logic.property.register(id, address, m2, year, 123)
    ).to.throw(`cadastre with value 123 is not a string`)
    )


    after(() => mongoose.disconnect())
})