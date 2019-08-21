const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const logic = require('.')

describe('logic - authenticate', () => {
    let client, users

    before(() => {
        client = new MongoClient('mongodb://localhost') //Create a new MongoClient instance.

        return client.connect() //Connect to MongoDB using a url
            .then(() => {
                const db = client.db('my-api-test')

                users = db.collection('users')

                logic.__users__ = users
            })
    })

    beforeEach(() => users.deleteMany())

    let name, surname, email, password

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
    })

        it('should succeed on correct data', () =>
            logic.authenticate(email, password)
                .then(() => users.findOne({ email }))
                .then(user => {
                    expect(user).to.exist
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)
                })
        )

    after(() => client.close())
})

// describe('logic - authenticate user', () => {
//     let user

//     beforeEach(() => {
//         user = {
//             name: 'John-' + random(),
//             surname: 'Doe-' + random(),
//             username: 'johndoe-' + random() + '@mail.com',
//             password: '123-' + random(),
//             favorites: []
//         }

//         return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, user)
//             .then(response => {
//                 if (response.status === 'KO') throw new Error(response.error)
//             })
//     })

//     it('should succeed on correct data', () =>
//         logic.authenticateUser(user.username, user.password)
//             .then(credentials => {
//                 expect(credentials).toBeDefined()

//                 const { id, token } = credentials
//                 expect(id).toBeDefined()
//                 expect(token).toBeDefined()
//             })
//     )

//     it('should fail on empty username', () =>
//         expect(() =>
//             logic.authenticateUser('', user.password)
//         ).toThrowError(Error, 'username is empty or blank')
//     )

//     it('should fail on non-valid username', () =>
//         expect(() =>
//             logic.authenticateUser('manuelbarzi#gmail.com', '123')
//         ).toThrowError(Error, 'username with value manuelbarzi#gmail.com is not a valid e-mail')
//     )

//     // TODO test more cases
// })
// }