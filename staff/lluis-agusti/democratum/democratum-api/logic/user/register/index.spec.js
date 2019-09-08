const logic = require('../..')
const { expect } = require('chai')
const { models , mongoose } = require('democratum-data')
const bcrypt = require('bcryptjs')
const { User } = models

describe('logic - register citizen', () => {

    before(() =>  mongoose.connect('mongodb://localhost/democratum-test', { useNewUrlParser: true }))
        
    let cityId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole

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

    })

    it('should succeed on correct data', async () => {
        const result = await logic.registerUser(cityId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole)
            
        expect(result).to.exist
        const user = await User.findOne({ email })
    
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

        const match = await bcrypt.compare(password, user.password)

        expect(match).to.be.true
    })


    // test cityId OK

    it('should fail on empty cityId', () =>
    expect(() =>
    logic.registerUser('', fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole)
    ).to.throw('cityId is empty or blank')
    )

    it('should fail on undefined cityId', () =>
        expect(() =>
        logic.registerUser(undefined, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole)
        ).to.throw(`cityId with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
    expect(() =>
    logic.registerUser(124, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole)
    ).to.throw(`cityId with value 124 is not a string`)
    )

    // test fullname OK

    it('should fail on empty fullname', () =>
    expect(() =>
    logic.registerUser(cityId, '', address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole)
    ).to.throw('fullname is empty or blank')
    )

    it('should fail on undefined fullname', () =>
        expect(() =>
        logic.registerUser(cityId, undefined, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole)
        ).to.throw(`fullname with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
    expect(() =>
    logic.registerUser(cityId, 123, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole)
    ).to.throw(`fullname with value 123 is not a string`)
    )
    
    // test address OK

    it('should fail on empty address', () =>
        expect(() =>
        logic.registerUser(cityId, fullname, '', documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole)
        ).to.throw('address is empty or blank')
    )
    
    it('should fail on undefined address', () =>
            expect(() =>
            logic.registerUser(cityId, fullname, undefined, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole)
            ).to.throw(`address with value undefined is not a string`)
    )
    
    it('should fail on wrong data type', () =>
        expect(() =>
        logic.registerUser(cityId, fullname, 123, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole)
        ).to.throw(`address with value 123 is not a string`)
    )


        // test docuemntId OK

        it('should fail on empty documentId', () =>
            expect(() =>
            logic.registerUser(cityId, fullname, address, '', email, imgDocId, password, participatedPolls, proposedPolls, userRole)
        ).to.throw('documentId is empty or blank')
        )
    
        it('should fail on undefined documentId', () =>
            expect(() =>
            logic.registerUser(cityId, fullname, address, undefined, email, imgDocId, password, participatedPolls, proposedPolls, userRole)
            ).to.throw(`documentId with value undefined is not a string`)
        )
    
        it('should fail on wrong data type', () =>
            expect(() =>
            logic.registerUser(cityId, fullname, address, 123, email, imgDocId, password, participatedPolls, proposedPolls, userRole)
        ).to.throw(`documentId with value 123 is not a string`)
        )

        // test email OK

        it('should fail on empty email', () =>
            expect(() =>
            logic.registerUser(cityId, fullname, address, documentId, '', imgDocId, password, participatedPolls, proposedPolls, userRole)
            ).to.throw('email is empty or blank')
        )
        
        it('should fail on undefined documentId', () =>
            expect(() =>
            logic.registerUser(cityId, fullname, address, documentId, undefined, imgDocId, password, participatedPolls, proposedPolls, userRole)
            ).to.throw(`email with value undefined is not a string`)
        )
        
        it('should fail on wrong data type', () =>
            expect(() =>
            logic.registerUser(cityId, fullname, address, documentId, 123, imgDocId, password, participatedPolls, proposedPolls, userRole)
            ).to.throw(`email with value 123 is not a string`)
        )
        

        // test documentId

        it('should fail on empty imgDocId', () =>
            expect(() =>
            logic.registerUser(cityId, fullname, address, documentId, email, '', password, participatedPolls, proposedPolls, userRole)
            ).to.throw('imgDocId is empty or blank')
        )
        
        it('should fail on undefined imgDocId', () =>
            expect(() =>
            logic.registerUser(cityId, fullname, address, documentId, email, undefined, password, participatedPolls, proposedPolls, userRole)
            ).to.throw(`imgDocId with value undefined is not a string`)
        )
        
        it('should fail on wrong data type', () =>
            expect(() =>
            logic.registerUser(cityId, fullname, address, documentId, email, 123, password, participatedPolls, proposedPolls, userRole)
            ).to.throw(`imgDocId with value 123 is not a string`)
        )


        // test password

        it('should fail on empty password', () =>
               expect(() =>
               logic.registerUser(cityId, fullname, address, documentId, email, imgDocId, '', participatedPolls, proposedPolls, userRole)
               ).to.throw('password is empty or blank')
           )
           
        it('should fail on undefined password', () =>
               expect(() =>
               logic.registerUser(cityId, fullname, address, documentId, email, imgDocId, undefined, participatedPolls, proposedPolls, userRole)
               ).to.throw(`password with value undefined is not a string`)
           )
           
        it('should fail on wrong data type', () =>
               expect(() =>
               logic.registerUser(cityId, fullname, address, documentId, email, imgDocId, 123, participatedPolls, proposedPolls, userRole)
               ).to.throw(`password with value 123 is not a string`)
           )


        // test userRole

        it('should fail on empty userRole', () =>
        expect(() =>
        logic.registerUser(cityId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, '')
        ).to.throw('userRole is empty or blank')
        )
    
        it('should fail on undefined userRole', () =>
        expect(() =>
        logic.registerUser(cityId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, undefined)
        ).to.throw(`userRole with value undefined is not a string`)
        )
    
        it('should fail on wrong data type', () =>
        expect(() =>
        logic.registerUser(cityId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, 123)
        ).to.throw(`userRole with value 123 is not a string`)
        )



    after(() => mongoose.disconnect())
})