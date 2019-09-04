require('dotenv').config()

const { expect } = require('chai')
const authenticateUser = require('.')
const { database, models: { User } } = require('vltra-data')

const { env: { DB_URL_TEST }} = process

describe('logic - authenticate user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, nickname, email, password, bookmarks, voted, id

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        nickname = `nickname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        bookmarks = []
        voted = []

        // users --> User
        return User.deleteMany()
            // replace users.insertOne() MongoDB method with User.create() Mongoose method.
            .then(() => User.create({ name, surname, nickname, email, password, bookmarks, voted })
                // .then(result => id = result.insertedId.toString()))
                .then(user => id = user.id))
    })

    it('should succeed on correct data', () =>
        authenticateUser(email, password)
            .then(_id => {
                expect(_id).to.exist
                expect(_id).to.be.a('string')
                expect(_id).to.equal(id)
            })
    )

    it('should fail on wrong email', () => 
    authenticateUser('Jhon@email.com', password)
    .then(_id => {
        expect(_id).to.be.undefined
    })
    .catch(error =>{
        expect(error).to.exist
        expect(error.message).to.equal('wrong credentials')
    })
    )
    it('should fail on wrong password', ()=>
    authenticateUser(email, 'dajhfkasf')
    .then(data => {
        expect(data).to.be.undefined
    })
    .catch(error=>{
        expect(error).to.exist
        expect(error.message).to.equal('wrong credentials')
    })
    )

     it('should fail on undefined email', () => 
        expect(() => 
               authenticateUser(undefined, password)
    ).to.throw(`email with value undefined is not a valid e-mail`)
    )

     it('should fail on wrong email data type', () => 
        expect(() => 
               authenticateUser(123, password)
    ).to.throw(`email with value 123 is not a valid e-mail`)
    )

    it('should fail on empty password', () => 
        expect(() => 
               authenticateUser(email, '')
    ).to.throw('password is empty or blank')
    )

     it('should fail on undefined password', () => 
        expect(() => 
               authenticateUser(email, undefined)
    ).to.throw(`password with value undefined is not a string`)
    )

     it('should fail on wrong password data type', () => 
        expect(() => 
               authenticateUser(email, 123)
    ).to.throw(`password with value 123 is not a string`)
    )

    // after(() => client.close())
    after(() => database.disconnect())
})