require('dotenv').config()

const {expect} = require('chai')
const logic = require('../../../logic')
const { database, models: { User } } = require('footcamp-data')
const bcrypt = require('bcryptjs')

const { env: { DB_URL_TEST }} = process


describe('logic-update user', ()=>{
    
    before(() =>  database.connect(DB_URL_TEST))

    beforeEach(async() => {
         await User.deleteMany()
    })

    describe('update user', () => {

        let id, name, surname, email, password

        beforeEach(async () => {
            
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
           
            const hash = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: hash })
            const user = await User.findOne({ email })

            id = user.id
        })

        it('should succeed on correct data', async () => {
            
            const user =  await logic.updateUser(id, { name: 'newName', surname: 'newSurname', email: 'new@email.com', password })
                expect(user).not.to.exist
                
            const userUpdate = await User.findOne({ _id: id })
          
                expect(userUpdate).to.exist
                expect(userUpdate.id).to.equal(id)
                expect(userUpdate.name).to.equal('newName')
                expect(userUpdate.surname).to.equal('newSurname')
                expect(userUpdate.email).to.equal('new@email.com')
                      
             
            })

        
     it('should fail on unexisting user', async () => {
        id="5d772fb62bb54120d08d7a7b"
        try {
            await logic.updateUser(id, {name: 'newName', surname: 'newSurname', email: 'new@email.com', password })
            throw Error('should not reach this point') 
        }
        catch({message}){
            expect(message).to.equal(`User with id ${id} does not exist.`)
        }
        
     })

        
        it('should fail on empty id', () =>
            expect(() =>
                logic.updateUser('', { name: 'newName', surname: 'newSurname', email: 'new@email.com', password: 'newPassword' })
            ).to.throw('id is empty or blank')
        )
        it('should fail on undefined id', () =>
            expect(() =>
                logic.updateUser(undefined, { name: 'newName', surname: 'newSurname', email: 'new@email.com', password: 'newPassword' })
            ).to.throw('id with value undefined is not a string')
        )
        it('should fail on non-string id', () =>
            expect(() =>
            logic.updateUser(12345, { name: 'newName', surname: 'newSurname', email: 'new@email.com', password: 'newPassword' })
        ).to.throw('id with value 12345 is not a string')

        )


    })
    after(()=> database.disconnect())
})