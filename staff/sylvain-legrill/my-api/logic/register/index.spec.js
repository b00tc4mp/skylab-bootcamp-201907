const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const logic = require('.')


describe('logic', () => {
    let client, users

    before(() => {
        client = new MongoClient('mongodb://localhost')

        return client.connect()
            .then(() => {
                const db = client.db('my-api-test')

                users = db.collection('users')

                logic.__users__ = users
            })
    })

    beforeEach(() => users.deleteMany())

    describe('register', () => {
        let name, surname, email, password, repassword

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
        })

        it('should succeed on correct data', () =>
            logic.registerUser(name, surname, email, password, repassword)
                .then(() => users.findOne({ name }))
                .then(user => {
                    expect(user).to.exist
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)
                })
        )

        it('should fail on empty name', () =>
        logic.authenticateUser('fake@email.com', password)
            .then(data => {
                expect(data).to.be.undefined
            })
            .catch(error => {
                expect(error).to.exist
                expect(error.message).to.equal('Wrong credentials.')
            })
        )

        it('should fail on empty name', () =>
            logic.registerUser('', 'Le Grill', 'legrills@gmail.com', '123', '123')
            .then((name) => {
                expect(name).to.be.empty
            })
            .catch(error => {
                expect(error).to.exist
                expect(error.message).to.equal('Name cannot be blank or empty')
            })
       
        )

        // it('should fail on non-valid username', () =>
        //     expect(() =>
        //         logic.registerUser('Sylvain', 'Le Grill', 'legrills#gmail.com', '123', '123')
        //     ).toThrowError(Error, 'username with value legrills#gmail.com is not a valid e-mail')
        // )

        // it('should fail on non-matching re-password', () =>
        //     expect(() =>
        //         logic.registerUser('Sylvain', 'Le Grill', 'legrills@gmail.com', '123', '456')
        //     ).toThrowError(Error, 'passwords do not match')
        // )
                    

    })
    after(() => client.close())
})