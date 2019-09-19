require('dotenv').config()

const { expect } = require('chai')
const unregisterUser = require('.')
const { database, models: { User } } = require('my-stuff-data')
const bcrypt = require('bcryptjs')

const { env: { DB_URL_TEST } } = process

describe('logic - unregister user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, password, id

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()

        const hash = await bcrypt.hash(password, 10)

        const user = await User.create({ name, surname, email, password: hash })
        id = user.id
    })

    it('should succeed on correct data', () =>
        unregisterUser(id, password)
            .then(result => {
                expect(result).not.to.exist

                return User.findById(id)
            })
            .then(user => {
                expect(user).not.to.exist
            })
    )

    it('should fail on unexisting user', () => {
        const id = '5d5d5530531d455f75da9fF9'

        unregisterUser(id, password)
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal(`user with id ${id} does not exist`))
    })

    it('should fail on existing user, but wrong password', () =>
        unregisterUser(id, 'wrong-password')
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('wrong credentials'))
    )

    after(() => database.disconnect())
})