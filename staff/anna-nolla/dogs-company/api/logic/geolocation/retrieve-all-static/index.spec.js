require('dotenv').config()
const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User } } = require('data')


const { env: { DB_URL }} = process


describe('logic - retrieve users by geolocation ', () => {
    before(() =>  database.connect(DB_URL))

    let name, surname, username, email, password, id, longitude, latitude
    const distance= 1200

    beforeEach(async () => {
        name = `torreAgbar-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `torreAgbar-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        longitude =  2.1894
        latitude =  41.403 
       
            const location = {type: 'Point', coordinates: [longitude, latitude]}
            const user = await User.create({ name, surname, username, email, password, static: location})
            id = user.id
    })

    it('should succeed on correct data', async () => {
        
        const users = await logic.retrieveAllStatic(id, distance)   
        debugger      
        expect(users[users.length -1]).to.exist
        })
/*         it('should fail on email does not exist', async () => {
            try{
                await retrieveUser('5d6f91ac50701384cf6a5d04')
            }catch({message}){
    
                expect(message).to.equal(`user with id 5d6f91ac50701384cf6a5d04 not found`)
            }
        })
        it('should fail on id is empty', async () => {
            try{
                await retrieveUser('')
            }catch({message}){
    
                expect(message).to.equal(`id is empty or blank`)
            }
        })
        it('should fail on id is not a string', async () => {
            try{
                await retrieveUser(123)
            }catch({message}){
    
                expect(message).to.equal(`id with value 123 is not a string`)
            }
        }) */

    after(() => database.disconnect())
})