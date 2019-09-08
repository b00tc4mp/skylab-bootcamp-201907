const logic = require('../..')
const bcrypt = require('bcrypt')
const { expect } = require('chai')
const { models , mongoose } = require('democratum-data')
const { User } = models

describe('logic - update user', () => {

    before(() =>  mongoose.connect('mongodb://localhost/democratum-test', { useNewUrlParser: true }))

    let cityId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole

    beforeEach(async () => {

        await User.deleteMany()

        cityId = `city-${Math.random()}`
        fullname = `fullname-${Math.random()}`
        address = `address-${Math.random()}`
        documentId = `documentid-${Math.random()}`
        email = `email@-${Math.random()}.com`
        imgDocId = `imgdocid-${Math.random()}`
        password = `password-${Math.random()}`
        participatedPolls = `partipolls-${Math.random()}`
        proposedPolls = `proposed-${Math.random()}`
        userRole = 'citizen'

        body = {
            cityId: `city-${Math.random()}`,
            fullname: `fullname-${Math.random()}`,
            address: `address-${Math.random()}`,
            documentId: `documentid-${Math.random()}`,
            email: `email@-${Math.random()}.com`,
            imgDocId: `imgdocid-${Math.random()}`,
            password: `password-${Math.random()}`,
            participatedPolls: `partipolls-${Math.random()}`,
            proposedPolls: `proposed-${Math.random()}`,
            userRole: 'citizen'
        }

    
            const user = await User.create({cityId, fullname, address, documentId, email, imgDocId, password: await bcrypt.hash (password, 10), participatedPolls, proposedPolls, userRole})

            id = user.id
    })

    it('should succeed on correct data', async () =>{
        const response = await logic.updateUser(id, body)

            expect(response).to.exist


            return ( async () => {
            
            const user = await User.findById(id)
           
                expect(user).to.exist
                expect(user.cityId).to.equal(body.cityId)
                expect(user.fullname).to.equal(body.fullname)
                expect(user.address).to.equal(body.address)
                expect(user.documentId).to.equal(body.documentId)
                expect(user.email).to.equal(body.email)
                expect(user.imgDocId).to.equal(body.imgDocId)
            /*  expect(user.password).to.exist
                expect(user.participatedPolls).to.equal(body.participatedPolls)
                expect(user.proposedPolls).to.equal(body.proposedPolls) */
                expect(user.userRole).to.equal(body.userRole)


        })
    })

    it('should fail on non-existing user', async () => {
        id = '5d5d5530531d455f75da9fF9'
        try{
            await logic.updateUser(id, body)
             throw new Error('should not reach this point') 

        }catch(error){
            expect(error.message).to.equal(`User with id ${id} does not exist.`)
        }
    })

    it('should fail on non-existing body', async () => {
        
        try{
            await logic.updateUser(id, )
             throw new Error('should not reach this point') 

        }catch(error){
            expect(error.message).to.equal(`No field to update provided`)
        }
    })

    it('should fail on empty id', () =>
    expect(() =>
    logic.updateUser("", body)
    ).to.throw('id is empty or blank')
    )
    it('should fail on undefined id', () =>
        expect(() =>
        logic.updateUser(undefined, body)
        ).to.throw(`id with value undefined is not a string`)
    )

    after(() => mongoose.disconnect())
})
