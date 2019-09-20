const { expect } = require('chai')
const logic = require('..')
const { User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - unregister user', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true, useUnifiedTopology:true }))

    let name, surname, email, password, id

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        return User.deleteMany()
            .then(() => User.create({ name, surname, email, password }))
            .then(user => id = user.id)
    })
    it('should succeed on correct data', () =>{

        logic.unregisterUser(id, password)
            .then(result => {
                expect(result).not.to.exist

                return User.findById(id)
            })
            .then(user => {
                expect(user).not.to.exist
            })
        })

/*      it('should fail on unexisting user', () =>{
        const _id = '5d62f4d76fdb415d25a14496'
        logic.unregisterUser(_id, password)
            .then((result) => { throw Error('should not reach this point') })
            .catch(({ message }) =>{debugger;expect(message).to.equal(`User with id: ${_id}, has a car yet.`)})
        }
    )  */
        

/*     it('should fail on existing user, but wrong password', () =>
        logic.unregisterUser(id, 'wrong-password')
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('wrong credentials'))
    ) */

    after(() => mongoose.disconnect())
})