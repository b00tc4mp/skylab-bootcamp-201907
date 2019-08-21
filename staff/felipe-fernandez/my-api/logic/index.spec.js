const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const logic = require('.')
const {ObjectId} = require('mongodb')

describe('logic', () => {
    let client, users

    before(() => {
        client = new MongoClient('mongodb://localhost')

        return client.connect()
            .then(() => {
                const db = client.db('skylab')

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
            repassword = password
        })

        it('should succeed on correct data', () =>
            logic.registerUser(name, surname, email, password, repassword)
                .then(result =>{
                    expect(result).not.to.exist   
                    users.findOne({ name })
                })
                .then(user => {
                    expect(user).to.exist
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)
                })
                .catch(error => {error})
        )
    })

    describe('authenticate', () => {
       
        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
            users.insertOne({ name, surname, email, password})
        })
        
        //.then(()=> users.findOne(email, password))

        it('should succeed on correct data', () =>
           logic.authenticateUser(email, password)
                .then(() => users.findOne({ email }))
                .then(response => {
                    expect(data).to.exist
                    expect(data.id).to.equal(data.id)
                    expect(data.token).to.equal(data.token)
                })
                .catch(error => {error})
       )})
       

    describe('retrieve', () => {
        let data ={}

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            return users.insertOne({ name, surname, email, password})
            .then(()=>{
                // data.id=`id-${Math.random()}`
                return(users.findOne({email, password}))
                .then (response=>{
                    data.token = `token-${Math.random()}`
                    data.id = response._id
                    return users.findOneAndUpdate({ _id: ObjectId(response._id) }, { $set: {token: data.token }})
                } )
                // data.token = `token-${Math.random()}`
                // return users.insertOne({data.token})
            })
            
        })
        

        it('should succeed on correct data', () =>
        
            logic.retrieveUser(data.id, data.token)
            
                .then((user => {
                    const { name, surname, email, token} = user
        
                    expect(data).to.exist
                    expect(_id).to.equal(data.id)
                    expect(name).to.equal(data.name)
                    expect(surname).to.equal(data.surname)
                    expect(email).to.equal(data.email)
                    expect(token).to.equal(data.token)
                })
                // .catch(error => {error})
        ))
    
    })

    after(() => client.close())
})