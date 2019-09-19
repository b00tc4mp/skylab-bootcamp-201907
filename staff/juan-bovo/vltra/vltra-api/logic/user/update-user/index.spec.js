require('dotenv').config()

const { expect } = require('chai')
const updateUser = require('.')
const { database, models: { User } } = require('vltra-data')

const { env: { DB_URL_TEST }} = process
describe('logic - update user', () => {
   
    before(() => database.connect(DB_URL_TEST))

    let name, surname, nickname, email, password, id, bookmarks, voted, body, newnickname

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        nickname = `nickname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        bookmarks = []
        voted = []

        newnickname = `new-nickname-${Math.random()}`,

        body = {
            name: `new-name-${Math.random()}`,
            surname: `new-surname-${Math.random()}`,
            nickname: newnickname.substr(0, 20),
            email: `new-email-${Math.random()}@domain.com`,
            password: `new-password-${Math.random()}`,
            extra: `new-extra-${Math.random()}`
        }

        await User.deleteMany()
            const user = await User.create({ name, surname, nickname : nickname.substr(0, 20), email, password, bookmarks, voted })
            id = user.id
    })

    it('should succeed on correct data', async () =>{
        const result = await updateUser(id, body)
        
            expect(result).not.to.exist

            const user = await  User.findById(id)
                expect(user).to.exist
                expect(user.name).to.equal(body.name)
                expect(user.surname).to.equal(body.surname)
                expect(user.email).to.equal(body.email)
                expect(user.password).to.equal(body.password)
                expect(user.extra).not.to.exist
    })
    

    it('should fail on non-existing user', async () => {
        id = '5d5d5530531d455f75da9fF9'
        try{
            await updateUser('5d5d5530531d455f75da9fF9', body)
            //throw new Error('should not reach this point') 
        } catch({ message }) {
            expect(message).to.equal(`user with id ${id} does not exist`)
        }

    })

    it('should fail on empty id', async () => {

          try{
            await updateUser('', body)

        } catch({ message }) {
            expect(message).to.equal("id is empty or blank")
        }
    })

    it('should fail on undefined id', async () => {

        try{
          await updateUser(undefined)

      } catch({ message }) {
          expect(message).to.equal("id with value undefined is not a string")
      }
   })

   it('should fail on wrong id data type', async() => {
       try{
              await updateUser(123)

          } catch({ message }) {
              expect(message).to.equal("id with value 123 is not a string")
          }
     
   })
   it('should fail on empty body', async() => {
    try{
           await updateUser(id, '')

       } catch({ message }) {
           expect(message).to.equal("body with value  is not an object")
       }
  
    })
      
    it('should fail on undefined body', async() => {
        try{
               await updateUser(id, undefined)
    
           } catch({ message }) {
               expect(message).to.equal(`body with value undefined is not an object`)
           }
      
        })

    it('should fail on wrong body data type', async() => {
        try{
                await updateUser(id, 123)
    
            } catch({ message }) {
                expect(message).to.equal(`body with value 123 is not an object`)
            }
        
        })

    after(() => database.disconnect())
})