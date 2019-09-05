require('dotenv').config() //nuevo
const { expect } = require('chai')
const authenticate=require('.')
const { database,models:{User} } = require('skyshop-data')

const{env: {DB_URL_TEST}}=process //nuevo

describe('logic - authenticate user', () => {
    before(() => database.connect(DB_URL_TEST)) //nuevo

    let name, surname, email, password, id

    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
            const user=await User.create({ name, surname, email, password })
            id = user.id
    })

    it('should succeed on correct data',async () =>{
        const _id=await authenticate(email, password)
        .then(_id => {
            expect(_id).to.exist
            expect(_id).to.be.a('string')
            expect(_id).to.equal(id)
        })
       
    })
    it('should fail on incorrect mail',async () => {
        try{
            await authenticate("pepito@mail.com", password)

        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal('Wrong credentials.')
        }
    }

    )
    it('should fail on wrong password',async () =>{
        try{
            await authenticate(email, "123")

        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal('Wrong credentials.')
        }
    }) 


    after(() => database.disconnect())
})