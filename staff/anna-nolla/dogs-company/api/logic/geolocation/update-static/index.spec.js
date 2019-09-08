require('dotenv').config()
const { expect } = require('chai')
const updateGeo = require('.')
const { database, models: { User } } = require('data')
const { env: { DB_URL_TEST }} = process

describe('logic - update geo', () => {
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
        /* const location= {type: 'Point', coordinates: [longitude, latitude]} */
            const user = await User.create({ name, surname, username, email, password})
            id = user.id
    })

    it('should succeed on correct data', async () =>{
        const response = await updateGeo(id, longitude, latitude)
        
            expect(response).not.to.exist
            return ( async () => {
            
            const user = await User.findById(id)
           
                expect(user).to.exist
                expect(user.name).to.equal(body.name)
                expect(user.surname).to.equal(body.surname)
                expect(user.username).to.equal(body.username)
                expect(user.email).to.equal(body.email)
                expect(user.password).to.equal(body.password)
                expect(user.longitud).to.equal(body.longitud)
                expect(user.latitude).to.equal(body.latitude)
               
                
        })
    })

    it('should fail on non-existing user', async () => {
        const fakeid = '5e711645a4734dc78985edb0'
       try{
        await updateGeo(fakeid,longitude,latitude)
       }catch({ message }){
           expect(message).to.equal(`user with id ${fakeid} does not exist`)
        }
    })


    after(() => database.disconnect())
})