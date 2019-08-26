const mongoose = require('mongoose')
const {expect} = require('chai')
const {User} = require('../../models')
const logic = require('..')



describe('logic', ()=>{
    before(()=>{
        mongoose.connect('mongodb://localhost/my-stuff-api', {useNewUrlParser: true})
       
    })

    beforeEach(() => User.deleteMany())

    describe('update user', () => {
        let id, name, surname, email, password

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            return User.create({name, surname, email, password})
               .then(user =>  id = user.id)
        })

        it('should succeed on correct data', () =>
            logic.updateUser(id, { name: 'newName', surname: 'newSurname', email: 'new@email.com', password: 'newPassword' })
                .then(user => {
                    expect(user).not.to.exist
                    return User.findOne({ _id: id })
                })
                .then(user => {
                    expect(user).to.exist
                    expect(user.name).to.equal('newName')
                    expect(user.surname).to.equal('newSurname')
                    expect(user.email).to.equal('new@email.com')
                    expect(user.password).to.equal('newPassword')
                })
        )

        it('should fail on empty id', () =>
            expect(() =>
                logic.updateUser('', { name: 'newName', surname: 'newSurname', email: 'new@email.com', password: 'newPassword' })
            ).to.throw('id is empty or blank')
        )

        it('should fail on undefined id', () =>
            expect(() =>
                logic.updateUser(undefined, { name: 'newName', surname: 'newSurname', email: 'new@email.com', password: 'newPassword' })
            ).to.throw('id with value undefined is not a string')
        )

    })

    after(()=> mongoose.disconnect())
})