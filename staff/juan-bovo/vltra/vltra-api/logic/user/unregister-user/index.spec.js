require('dotenv').config()

const { expect } = require('chai')
const unregisterUser = require('.')
const { database, models: { User } } = require('vltra-data')
const bcrypt = require('bcryptjs')

const { env: { DB_URL_TEST }} = process


describe('logic - unregister user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, nickname, email, password, bookmarks, voted, id

    beforeEach(async () => {
        await User.deleteMany()
        
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        nickname = `nickname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        bookmarks = []
        voted = []

        //const user = await User.create({ name, surname, nickname, email, password, bookmarks, voted })
        
        const hash = await bcrypt.hash(password,10)
        
        const user = await User.create({name, surname, nickname : nickname.substr(0, 20), email, password : hash, bookmarks, voted})
        id = user.id
    })

    it('should succeed on correct data', async () => {

        const result = await unregisterUser(id, email, password)
            
            expect(result).not.to.exist

            const user = await User.findById(id)
            
            expect(user).not.to.exist   
    })

    it('should fail on unexisting user id', async () => {
        try{
            await unregisterUser('5d5d5530531d455f75da9fF9', email, password)

        } catch({ message }) {
            expect(message).to.equal('wrong credentials')
        }
    })

    it('should fail on valid but wrong email', async () => {
        try{
            await unregisterUser(id, "wrongemail@email.com", password)

        } catch({ message }) {
            expect(message).to.equal('user with email wrongemail@email.com does not exist')
        }
    })

    it('should fail on existing user, but wrong password', async () => {
        try{
            await unregisterUser(id, email, 'wrongpassword')

        } catch({ message }) {
            expect(message).to.equal('wrong credentials')
        }
    })

    it('should fail on empty id', async () => {
        try{
            await unregisterUser('', email, password)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`id with value  is not a valid ObjectId`)
        }
    })
    it('should fail on undefined id', async () => {
        try{
            await await unregisterUser(undefined, email, password)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`id with value undefined is not a valid ObjectId`)
        }
    })
    it('should fail on wrong id data type', async () => {
        try{
            await await unregisterUser(123, email, password)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`id with value 123 is not a valid ObjectId`)
        }
    })

    it('should fail on empty email', async () => {
        try{
            await unregisterUser(id, '', password)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`email is empty or blank`)
        }
    })
    it('should fail on undefined email', async () => {
        try{
            await await unregisterUser(id, undefined, password)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`email with value undefined is not a string`)
        }
    })
    it('should fail on wrong email data type', async () => {
        try{
            await await unregisterUser(id, 123, password)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`email with value 123 is not a string`)
        }
    })

    it('should fail on empty password', async () => {
        try{
            await unregisterUser(id, email, '')
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`password is empty or blank`)
        }
    })
    it('should fail on undefined password', async () => {
        try{
            await await unregisterUser(id, email, undefined)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`password with value undefined is not a string`)
        }
    })
    it('should fail on wrong password data type', async () => {
        try{
            await await unregisterUser(id, email, 123)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`password with value 123 is not a string`)
        }
    })

    after(() => database.disconnect())
})