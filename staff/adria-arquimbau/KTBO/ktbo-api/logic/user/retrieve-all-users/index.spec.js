require('dotenv').config()

const { expect } = require('chai')
const retrieveAllUsers = require('.')
const { database, models: { User } } = require('ktbo-data')
const { random: { number, boolean, value } } = require('ktbo-utils')
const { random } = Math

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve all users', () => {
    before(() => database.connect(DB_URL_TEST))
    
    let company1, country1, email1, password1, role1, id1, id
    let company2, country2, email2, password2, role2, id2

    beforeEach(async () => {

            company1 = `company-${random()}`
            country1 =  `country-${random()}`
            email1 = `email-${random()}@domain.com`
            password1 =  `password-${random()}`
            role1 =  value('admin')

            company2 = `company-${random()}`
            country2 =  `country-${random()}`
            email2 = `email-${random()}@domain.com`
            password2 =  `password-${random()}`
            role2 =  value('admin', 'regular')
        
            await User.deleteMany()
            
            const res1 = await User.create({ company: company1, country: country1, email: email1, password: password1, role: role1 })
            id1 = res1.id
            
            const res2 = await User.create({ company: company2, country: country2, email: email2, password: password2, role: role2 })
            id2 = res2.id    
    })
    
    it('should succeed on correct data', async () => {

        const users = await retrieveAllUsers(id1)
            
            //USER 1
                expect(users[0]).to.exist
                expect(users[0].id).to.equal(id1)
                expect(users[0]._id).to.exist
                expect(users[0].company).to.equal(company1)
                expect(users[0].country).to.equal(country1)
                expect(users[0].email).to.equal(email1)
                expect(users[0].password).not.to.exist
                expect(users[0].role).to.equal(role1)

            //USER 2    
                expect(users[1]).to.exist
                expect(users[1].id).to.equal(id2)
                expect(users[1]._id).to.exist
                expect(users[1].company).to.equal(company2)
                expect(users[1].country).to.equal(country2)
                expect(users[1].email).to.equal(email2)
                expect(users[1].password).not.to.exist
                expect(users[1].role).to.equal(role2)
        })

        it('should fail if user1 is not an admin', async () =>{

            company1 = `company-${random()}`
            country1 =  `country-${random()}`
            email1 = `email-${random()}@domain.com`
            password1 =  `password-${random()}`
            role1 =  value('regular')

            company2 = `company-${random()}`
            country2 =  `country-${random()}`
            email2 = `email-${random()}@domain.com`
            password2 =  `password-${random()}`
            role2 =  value('admin', 'regular')
        
            await User.deleteMany()
            
            const res1 = await User.create({ company: company1, country: country1, email: email1, password: password1, role: role1 })
            id1 = res1.id
            
            const res2 = await User.create({ company: company2, country: country2, email: email2, password: password2, role: role2 })
            id2 = res2.id    

            try {
                await retrieveAllUsers(id1)
            } catch (error) {
                expect(error.message).to.equal(`User with id ${id1} is not an admin`)
            }


        })


        after(() => database.disconnect())
})

