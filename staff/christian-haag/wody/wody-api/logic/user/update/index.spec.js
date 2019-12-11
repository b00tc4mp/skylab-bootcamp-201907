const { expect } = require('chai')
const logic = require('../../.')
const { models: { User } } = require('wody-data')
const { random, floor } = Math
const { database } = require('wody-data')

describe('logic -  prepare env. to update user', () => {
    before(() => database.connect('mongodb://localhost/wody-server-test', { useNewUrlParser: true }))

    let name, surname, email, password, gender, birthday, weight, height, goal, fitnesslevel, id

    let genderRandom = ['male', 'female']
    let fitnessLvlRandom = ['low', 'mid', 'high']
    let goalRandom = ['lose', 'fit', 'gain']
    let rand = (param) => floor(random() * param.length)

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@domain.com`
        password = `password-${random()}`
        gender = genderRandom[rand(genderRandom)]
        fitnesslevel = fitnessLvlRandom[rand(fitnessLvlRandom)]
        goal = goalRandom[rand(goalRandom)]
        birthday = '29/06/1984'
        weight = floor(random() * ((130 - 50) + 1) + 50)
        height = floor(random() * ((215 - 50) + 1) + 50)

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password, gender, birthday, weight, height, goal, fitnesslevel })
        id = user.id
    })

    it('should succed on correct data', async () => {
        const user = await logic.retrieveUser(id)

        expect(user).to.exist
        expect(user.id).to.equal(id)
        expect(user.weight).to.equal(weight)
        expect(user.email).to.equal(email)
        expect(user.fitnesslevel).to.equal(fitnesslevel)

    })

    describe('logic - update user happy-path', () => {
        let body
        let fitnessLvlRandom = ['low', 'mid', 'high']

        let rand = (param) => floor(random() * param.length)

        beforeEach(async () => {

            body = {
                weight: floor(random() * ((130 - 50) + 1) + 50),
                fitnesslevel: `updated-${fitnessLvlRandom[rand(fitnessLvlRandom)]}`,
                email: `updated-${random()}@domain.com`,
                password: `updated-${random()}`,
            }
        })

        it('should fail on empty id', () =>
            expect(() =>
                logic.updateUser('')
            ).to.throw('id is empty or blank')
        )

        it('should fail on undefined id', () =>
            expect(() =>
                logic.updateUser(undefined)
            ).to.throw(`id with value undefined is not a string`)
        )

        it('should fail on wrong data type', () =>
            expect(() =>
                logic.updateUser(123456798)
            ).to.throw(`id with value 123456798 is not a string`)
        )

        it('should succed on correct data input', () => {
            expect(body.weight).to.be.a('number')
            expect(body.fitnesslevel).to.be.a('string')
            expect(body.email).to.be.a('string')
            expect(body.password).to.be.a('string')
        })

        it('should succeed on correct data', async () => {
            const result = await logic.updateUser(id, body)

            expect(result).not.to.exist

            const user = await User.findById(id)

            expect(user).to.exist
            expect(user.weight).to.equal(body.weight)
            expect(user.fitnesslevel).to.equal(body.fitnesslevel)
            expect(user.email).to.equal(body.email)
            expect(user.password).to.equal(body.password)
        })

    })

    after(() => database.disconnect())
})

