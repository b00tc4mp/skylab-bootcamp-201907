const logic = require('../..')
const { expect } = require('chai')
const { models , mongoose } = require('democratum-data')
const bcrypt = require('bcryptjs')
const { User } = models

describe('logic - authenticate citizen', () => {

    before(() =>  mongoose.connect('mongodb://localhost/democratum-test', { useNewUrlParser: true }))
        
    let cityId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole, id

    beforeEach(async () => {

        //await User.deleteMany()

        cityId = `FROMAUTH-${Math.random()}`
        fullname = `fullname-${Math.random()}`
        address = `address-${Math.random()}`
        documentId = `documentid-${Math.random()}@domain.com`
        email = `email@-${Math.random()}.com`
        imgDocId = `imgdocid-${Math.random()}`
        password = `pwd-${Math.random()}`
        participatedPolls = `partipolls-${Math.random()}`
        proposedPolls = ['k89236423894y2348', '12323']
        userRole = 'citizen'

        const user = await User.create({cityId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole})

        id = user.id

        // password: await bcrypt.hash (password, 10)
        
    })

    it('should succeed on correct data', async () => {

        const _id = await logic.authenticateUser(email, password)

            expect(_id).to.exist
            expect(_id).to.be.a('string')
            expect(_id).to.equal(id)
    })

    // test email OK

    it('should fail on empty email', () =>
        expect(() => logic.authenticateUser('', password)).to.throw('email is empty or blank')
    )
    
        it('should fail on undefined email', () =>
            expect(() =>
            logic.authenticateUser(undefined, password)
            ).to.throw(`email with value undefined is not a string`)
        )
    
        it('should fail on wrong data type', () =>
        expect(() =>
        logic.authenticateUser(123, password)
        ).to.throw(`email with value 123 is not a string`)
        )

            // test password OK

    it('should fail on empty password', () =>
    expect(() => logic.authenticateUser(email, '')).to.throw('password is empty or blank')
)

    it('should fail on undefined password', () =>
        expect(() =>
        logic.authenticateUser(email, undefined)
        ).to.throw('password with value undefined is not a string')
    )

    it('should fail on wrong data type', () =>
    expect(() =>
    logic.authenticateUser(email, 123)
    ).to.throw('password with value 123 is not a string')
    )

    after(() => mongoose.disconnect())
})