require('dotenv').config() //nuevo
const { expect } = require('chai')
const unregister=require('.')
const {database, models:{User} } = require('skyshop-data')

const{env: {DB_URL_TEST}}=process //nuevo

describe('logic - unregister user', () => {
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
        const result=await unregister(id, password)
 
        expect(result).not.to.exist
        const user=await User.findById(id)  
        expect(user).not.to.exist
    }
/*         logic.user.unregister(id, password)
            .then(result => {
                expect(result).not.to.exist

                return User.findById(id)
            })
            .then(user => {
                expect(user).not.to.exist
            }) */
    )

    it('should fail on unexisting user',async () =>{
        try{
            await unregister('5d5d5530531d455f75da9fF9', password)
            throw Error('should not reach this point') 

        }catch(error){
            expect(error.message).to.equal('wrong credentials')

        }
    })

    it('should fail on existing user, but wrong password', async() =>{
        try{
            await unregister(id, 'wrong-password')

        }catch(error){
            expect(error.message).to.equal('wrong credentials')

        }
    })

    after(() => database.disconnect())
})