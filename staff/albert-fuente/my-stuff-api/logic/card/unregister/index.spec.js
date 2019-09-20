const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Card } = require('../../../models')

describe('logic - delete card', () => {
    
    let name,surname,email,password
    let id,number,expiry, cardId


    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    
    beforeEach(async() => {

                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@email.com`
                password = `123-${Math.random()}`
                number = `1-${Math.random()}`
                expiry = `0${Math.floor(Math.random() * 9)}/0${Math.floor(Math.random() * 9)}`
                  

        await User.deleteMany()
                     // Register user first to make sure it exists
            const user=await User.create({ name, surname, email, password })
            
                id = user.id // es el mateix que user._id.toString())
                
                const card=await new Card({id,number,expiry})
                cardId=card.id
                
                user.cards.push(card)
                return await user.save() //retornes l'usuari guardat
                     
    })

    it('should succeed on correct data',async () =>{        
        const card=await logic.card.unregister(id,cardId)   
                             
                expect(card).not.to.exist
            }
    
        
    )

            it('should fail if there is no user', async() =>{
                try{
                    await logic.card.unregister("5d5d5530531d455f75da9fF9", cardId)

                }catch (error){
                    expect(error).to.exist
                    expect(error.message).to.equal(`User does not exists.`)

                }
            }        
        ) 
        it('should fail if there is no card',async () =>{
        let x= '5d5d5530531d455f75da9fF9'
        try{
            logic.card.unregister(id, x)


        }catch(error){
            expect(error).to.exist
                expect(error.message).to.equal(`Card with id ${x} does not exist.`)
        }
    }) 
    after(() => mongoose.disconnect())
})


/* number = `1-${Math.random()}`
            expiry = `"0"+${Math.floor(Math.random() * 9)}/"0"+${Math.floor(Math.random() * 9)}`
             */