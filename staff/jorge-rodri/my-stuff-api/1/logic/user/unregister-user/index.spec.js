const { expect } = require('chai')
const logic = require('..')
const { User, Property } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - unregister user', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true, useUnifiedTopology: true }))

    let name, surname, email, password, id, _user

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`


        await User.deleteMany()
        _user = await User.create({ name, surname, email, password })
        id = _user.id

    })

    it('should succeed on correct data', async () => {
        
        const result = await logic.unregisterUser(id, password)
        expect(result).not.to.exist

        const user = await User.findById(id)
        expect(user).not.to.exist

    })

    it('should fail on unexisting user', async () => {
        const _id = '5d62f4d76fdb415d25a14496'

        try {

            await logic.unregisterUser(_id, password)

        } catch (error) {

            expect(error.message).to.equal(`wrong credentials`)

        }
    })

    it('wrong because user has a property yet', async () => {
        let property = {
            address: "ojaspokfg",
            m2: 150,
            year: 1899,
            cadastre: "asdsaf34",
            owners: [_user]
        }

        await Property.create(property)

        try {

            await logic.unregisterUser(id, password)

        } catch (error) {

            expect(error.message).to.equal(`User with id: ${id}, has a property yet`)

        }

        await Property.deleteMany()
        property = undefined

    })


    it('should fail on existing user, because wrong password', async () => {
        try {

            await logic.unregisterUser(id, 'wrong-password')

        } catch (error) {
            
            expect(error.message).to.equal(`wrong credentials`)

        }
    })

    it('should fail on existing user, because wrong id', async () => {
        try {

            await logic.unregisterUser('5d66385aa9cc484ad9727cb4', password)

        } catch (error) {
            
            expect(error.message).to.equal(`wrong credentials`)

        }
    })

    it('should fail on existing user, because wrong id', async () => {
        try {

            await logic.unregisterUser('', password)

        } catch (error) {
            
            expect(error.message).to.equal(`id is empty`)

        }
    })

    after(() => mongoose.disconnect())
})