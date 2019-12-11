require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User } } = require('data')
const { env: { DB_URL_TEST }} = process

describe('logic - update Dinamic Geolocation', () => {
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, email, username, password, longitude, latitude, id

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `username-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        longitude= Math.random()
        latitude= Math.random()

        await User.deleteMany()
            const user = await User.create({ name, surname, username, email, password})
                id = user.id
    })

    it('should succeed on correct data', async () =>{
        const response = await logic.updateDinamic(id, longitude, latitude)
     
            expect(response).not.to.exist

            const user = await User.findById(id)
                expect(user).to.exist
                expect(user.dinamic.coordinates[0]).to.equal(longitude)
                expect(user.dinamic.coordinates[1]).to.equal(latitude)
    })

    it('should fail on non-existing user', async () => {

        const _id = '5e711645a4734dc78985edb0'

        try{
            const result = await logic.updateDinamic(_id, longitude, latitude)
                expect(result).to.exist
        }catch({ message }){
           expect(message).to.equal(`User not found`)
        }
    })
    it('should fail on empty user id', () =>
        expect(() => logic.updateDinamic("", longitude, latitude)).to.throw('user id is empty or blank')
    )

    it('should fail on wrong user id type', () =>
        expect(() => logic.updateDinamic(123, longitude, latitude)).to.throw('user id with value 123 is not a string')
    )

    it('should fail on wrong longitude type', () =>
        expect(() => logic.updateDinamic(id, 'longitude', latitude)).to.throw('longitude with value longitude is not a number')
    )

    it('should fail on wrong latitude type ', () =>
        expect(() => logic.updateDinamic(id, longitude, 'latitude')).to.throw('latitude with value latitude is not a number')
    )

    after(() => database.disconnect())
})