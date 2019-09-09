require('dotenv').config()
const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User } } = require('data')

const { env: { DB_URL }} = process

describe('logic - retrieve users by dinamic geolocation', () => {
    before(() =>  database.connect(DB_URL))

    let name, surname, email, password, id, longitude, latitude, 
        name1, surname1, email1, password1, id1, longitude1, latitude1, 
        name2, surname2,  email2, password2, id2, longitude2, latitude2,
        name3, surname3,  email3, password3, id3, longitude3, latitude3
    
    const distance = 10000

    beforeEach(async () => {
        
        name = `torreAgbar-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        longitude =  2.1894
        latitude =  41.403 

        name1 = `name-${Math.random()}`
        surname1 = `surname-${Math.random()}`
        email1 = `email-${Math.random()}@domain.com`
        password1 = `password-${Math.random()}`
        longitude1 =  2.1895
        latitude1 =  41.404

        name2 = `name-${Math.random()}`
        surname2 = `surname-${Math.random()}`
        email2 = `email-${Math.random()}@domain.com`
        password2 = `password-${Math.random()}`
        longitude2 =  2.1896
        latitude2 =  41.405

        name3 = `torreAgbar-${Math.random()}`
        surname3 = `surname-${Math.random()}`
        email3 = `email-${Math.random()}@domain.com`
        password3 = `password-${Math.random()}`
        // longitude3=  0
        // latitude3 =  0 
        
        await User.deleteMany()
            const location1 = {type: 'Point', coordinates: [longitude, latitude]}
            const user = await User.create({ name, surname, email, password, dinamic: location1})
                id = user.id

            const location2 = {type: 'Point', coordinates: [longitude1, latitude1]}
            const user1 = await User.create({ 'name': name1, 'surname': surname1, 'email': email1, 'password': password1, static: location2})
                id1 = user1.id

            const location3 = {type: 'Point', coordinates: [longitude2, latitude2]}
            const user2 = await User.create({ 'name': name2, 'surname': surname2, 'email': email2, 'password': password2, static: location3})
                id2 = user2.id

            // const location4 = {type: 'Point', coordinates: [longitude3, latitude3]}
            const user3 = await User.create({ 'name': name3, 'surname': surname3, 'email': email3, 'password': password3})
                id3 = user3.id
    })

    it('should succeed on correct data', async () => {

        let users = await logic.retrieveAllStatic(id, distance)   
            expect(users[0].id).to.equal(id1)
            expect(users[1].id).to.equal(id2)
            expect(users[2]).not.to.exist
    })

    it('should fail on non-existing user', async () => {

        const _id = '5e711645a4734dc78985edb0'
        try{
            const result = await logic.retrieveAllStatic(_id, distance)
                expect(result).to.exist
        }catch({ message }){
           expect(message).to.equal(`User not found`)
        }
    })

    it('should fail on non-existing location', async () => {

            try{
                const res = await logic.retrieveAllStatic(id3, distance)
                    expect(res).not.to.exist
            }catch(error) {
                expect(error).to.exist
                expect(error.message).to.equal(`User dinamic location not found`)
            }
    })

    it('should fail on empty user id', () =>
        expect(() => logic.retrieveAllStatic("", distance)).to.throw('user id is empty or blank')
    )

    it('should fail on wrong user id type', () =>
        expect(() => logic.retrieveAllStatic(123, distance)).to.throw('user id with value 123 is not a string')
    )

    it('should fail on wrong distance type', () =>
        expect(() => logic.retrieveAllStatic(id, '123')).to.throw('distance with value 123 is not a number')
    )

    after(() => database.disconnect())
})