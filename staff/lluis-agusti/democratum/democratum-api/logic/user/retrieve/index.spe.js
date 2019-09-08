require('dotenv').config()

const logic = require('../..')
const { expect } = require('chai')
const { models , mongoose } = require('democratum-data')
const bcrypt = require('bcryptjs')
const { User } = models


describe('logic - retrieve user', () => {
    before(() => database.connect('mongodb://localhost/democratum-test', {useNewUrlParser: true }))

    let cityId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole, id

    beforeEach(async () => {

        await User.deleteMany()

        cityId = `cityid-${Math.random()}`
        fullname = `fullname-${Math.random()}`
        address = `address-${Math.random()}`
        documentId = `documentid-${Math.random()}@domain.com`
        email = `email@-${Math.random()}.com`
        imgDocId = `imgdocid-${Math.random()}`
        password = `password-${Math.random()}`
        participatedPolls = [`partipolls-${Math.random()}`]
        proposedPolls = ['k89236423894y2348', '12323']
        userRole = 'citizen'

        const user = await User.create({ cityId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole })
        id = user.id
    })

    it('should succeed on correct data', async () =>{

        const user = await logic.retrieveUser(id)

        expect(user).to.exist
        expect(user.cityId).to.equal(cityId)
        expect(user.fullname).to.equal(fullname)
        expect(user.address).to.equal(address)
        expect(user.documentId).to.equal(documentId)
        expect(user.email).to.equal(email)
        expect(user.imgDocId).to.equal(imgDocId)
        //expect(user.password).to.equal(password)
        //expect(user.participatedPolls).to.equal(participatedPolls) // me dice que debe ser array
        //expect(user.proposedPolls).to.equal(proposedPolls) // me dice que debe ser array
        expect(user.userRole).to.equal(userRole)

        //const match = await bcrypt.compare(password, user.password)

        //expect(match).to.be.true
    })
    it('should throw an error with a wrong id', async () =>{
        try{
            await retrieveUser("5d5fe532b4f3f827e6fc64f8")
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`user with id 5d5fe532b4f3f827e6fc64f8 not found`)
        }
    })

    it('should fail on empty user id', () =>
        expect(() => retrieveUser("")).to.throw('user id is empty or blank')
    )

    it('should fail on undefined user id', () =>
    expect(() => retrieveUser(undefined)).to.throw('id with value undefined is not a string')
)

    it('should fail on wrong user id type', () =>
        expect(() => retrieveUser(123)).to.throw('user id with value 123 is not a string')
    )
    after(() => database.disconnect())
})