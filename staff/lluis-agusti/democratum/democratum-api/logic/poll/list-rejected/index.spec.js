const logic = require('../../.')
const { expect } = require('chai')
const { models , mongoose } = require('democratum-data')
const { Citizen } = models

describe('logic - list all rejected polls of a city', () => {

    before(() =>  mongoose.connect('mongodb://localhost/democratum-test', { useNewUrlParser: true }))

    let fullname, address, documentId, email, imgDocId, password, participatedPolls, id

    beforeEach(async () => {
        fullname = `fullname-${Math.random()}`
        address = `address-${Math.random()}`
        documentId = `documentid-${Math.random()}@domain.com`
        email = `email@-${Math.random()}.com`
        imgDocId = `imgdocid-${Math.random()}`
        password = `password-${Math.random()}`
        participatedPolls = `partipolls-${Math.random()}`

        body = {
            fullname: `fullname-${Math.random()}`,
            address: `address-${Math.random()}`,
            documentId: `documentid-${Math.random()}@domain.com`,
            email: `email@-${Math.random()}.com`,
            imgDocId: `imgdocid-${Math.random()}`,
            password: `password-${Math.random()}`,
            participatedPolls: `partipolls-${Math.random()}`
        }

        await Citizen.deleteMany()
            const citizen = await Citizen.create({ fullname, address, documentId, email, imgDocId, password, participatedPolls })
            id = citizen.id
    })

    it('should succeed on correct data', async () =>{
        const response = await logic.citizen.update(id, body)

            expect(response).not.to.exist
            return ( async () => {
            
            const citizen = await Citizen.findById(id)
           
                expect(citizen).to.exist
                expect(citizen.fullname).to.equal(body.fullname)
                expect(citizen.address).to.equal(body.address)
                expect(citizen.documentId).to.equal(body.documentId)
                expect(citizen.email).to.equal(body.email)
                expect(citizen.imgDocId).to.equal(body.imgDocId)
                expect(citizen.password).to.equal(body.password)
                expect(citizen.participatedPolls).to.equal(body.participatedPolls)
        })
    })

    it('should fail on non-existing user', async () => {
       try {

        await logic.citizen.update('5d5d5530531d455f75da9fF9', body)

       } catch({ message }){
           
           expect(message).to.equal('wrong credentials')
     }
    })

    after(() => mongoose.disconnect())
})
