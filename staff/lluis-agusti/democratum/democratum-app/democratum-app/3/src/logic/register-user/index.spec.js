import registerUser from '.'

const logic = require('../..')
const { expect } = require('chai')
const { models , mongoose } = require('democratum-data')
const bcrypt = require('bcryptjs')
const { User } = models

describe.only('logic - register citizen', () => {

    before(() =>  mongodb.connect('mongodb://localhost/democratum-test', { useNewUrlParser: true }))
    
    let cityId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole

    beforeEach(async () => {

        await User.deleteMany()

        cityId = `usercit1227yid-${Math.random()}`
        fullname = `userfullname-${Math.random()}`
        address = `address-${Math.random()}`
        documentId = `documentid-${Math.random()}@domain.com`
        email = `email@-${Math.random()}.com`
        imgDocId = `imgdocid-${Math.random()}`
        password = `password-${Math.random()}`
        participatedPolls = [`partipolls-${Math.random()}`]
        proposedPolls = [`k89236423894y2348`, `12323`]
        userRole = 'citizen'

    })

    it('should succeed on correct data', async () => {
        
        const result = await registerUser(cityId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole)
            
        expect(result).toBeDefined()
        const user = await User.findOne({ email })
    
        expect(user).toBeDefined()
        expect(user.cityId).toBe(cityId)
        expect(user.fullname).toBe(fullname)
        expect(user.address).toBe(address)
        expect(user.documentId).toBe(documentId)
        expect(user.email).toBe(email)
        expect(user.imgDocId).toBe(imgDocId)
        expect(user.userRole).toBe(userRole)

        const match = await bcrypt.compare(password, user.password)

        expect(match).toBeTruthy()
    })


    // test cityId OK

    it('should fail on empty cityId', () =>
    expect(() =>
    logic.registerUser('', fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole)
    ).toThrow('cityId is empty or blank')
    )

    it('should fail on undefined cityId', () =>
        expect(() =>
        logic.registerUser(undefined, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole)
        ).toThrow(`cityId with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
    expect(() =>
    logic.registerUser(124, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole)
    ).toThrow(`cityId with value 124 is not a string`)
    )

    // test fullname OK

    it('should fail on empty fullname', () =>
    expect(() =>
    logic.registerUser(cityId, '', address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole)
    ).toThrow('fullname is empty or blank')
    )

    it('should fail on undefined fullname', () =>
        expect(() =>
        logic.registerUser(cityId, undefined, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole)
        ).toThrow(`fullname with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
    expect(() =>
    logic.registerUser(cityId, 123, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole)
    ).toThrow(`fullname with value 123 is not a string`)
    )
    
    // test address OK

    it('should fail on empty address', () =>
        expect(() =>
        logic.registerUser(cityId, fullname, '', documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole)
        ).toThrow('address is empty or blank')
    )
    
    it('should fail on undefined address', () =>
            expect(() =>
            logic.registerUser(cityId, fullname, undefined, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole)
            ).toThrow(`address with value undefined is not a string`)
    )
    
    it('should fail on wrong data type', () =>
        expect(() =>
        logic.registerUser(cityId, fullname, 123, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole)
        ).toThrow(`address with value 123 is not a string`)
    )


        // test docuemntId OK

        it('should fail on empty documentId', () =>
            expect(() =>
            logic.registerUser(cityId, fullname, address, '', email, imgDocId, password, participatedPolls, proposedPolls, userRole)
        ).toThrow('documentId is empty or blank')
        )
    
        it('should fail on undefined documentId', () =>
            expect(() =>
            logic.registerUser(cityId, fullname, address, undefined, email, imgDocId, password, participatedPolls, proposedPolls, userRole)
            ).toThrow(`documentId with value undefined is not a string`)
        )
    
        it('should fail on wrong data type', () =>
            expect(() =>
            logic.registerUser(cityId, fullname, address, 123, email, imgDocId, password, participatedPolls, proposedPolls, userRole)
        ).toThrow(`documentId with value 123 is not a string`)
        )

        // test email OK

        it('should fail on empty email', () =>
            expect(() =>
            logic.registerUser(cityId, fullname, address, documentId, '', imgDocId, password, participatedPolls, proposedPolls, userRole)
            ).toThrow('email is empty or blank')
        )
        
        it('should fail on undefined documentId', () =>
            expect(() =>
            logic.registerUser(cityId, fullname, address, documentId, undefined, imgDocId, password, participatedPolls, proposedPolls, userRole)
            ).toThrow(`email with value undefined is not a string`)
        )
        
        it('should fail on wrong data type', () =>
            expect(() =>
            logic.registerUser(cityId, fullname, address, documentId, 123, imgDocId, password, participatedPolls, proposedPolls, userRole)
            ).toThrow(`email with value 123 is not a string`)
        )
        

        // test documentId

        it('should fail on empty imgDocId', () =>
            expect(() =>
            logic.registerUser(cityId, fullname, address, documentId, email, '', password, participatedPolls, proposedPolls, userRole)
            ).toThrow('imgDocId is empty or blank')
        )
        
        it('should fail on undefined imgDocId', () =>
            expect(() =>
            logic.registerUser(cityId, fullname, address, documentId, email, undefined, password, participatedPolls, proposedPolls, userRole)
            ).toThrow(`imgDocId with value undefined is not a string`)
        )
        
        it('should fail on wrong data type', () =>
            expect(() =>
            logic.registerUser(cityId, fullname, address, documentId, email, 123, password, participatedPolls, proposedPolls, userRole)
            ).toThrow(`imgDocId with value 123 is not a string`)
        )


        // test password

        it('should fail on empty password', () =>
               expect(() =>
               logic.registerUser(cityId, fullname, address, documentId, email, imgDocId, '', participatedPolls, proposedPolls, userRole)
               ).toThrow('password is empty or blank')
           )
           
        it('should fail on undefined password', () =>
               expect(() =>
               logic.registerUser(cityId, fullname, address, documentId, email, imgDocId, undefined, participatedPolls, proposedPolls, userRole)
               ).toThrow(`password with value undefined is not a string`)
           )
           
        it('should fail on wrong data type', () =>
               expect(() =>
               logic.registerUser(cityId, fullname, address, documentId, email, imgDocId, 123, participatedPolls, proposedPolls, userRole)
               ).toThrow(`password with value 123 is not a string`)
           )


        // test userRole

        it('should fail on empty userRole', () =>
        expect(() =>
        logic.registerUser(cityId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, '')
        ).toThrow('userRole is empty or blank')
        )
    
        it('should fail on undefined userRole', () =>
        expect(() =>
        logic.registerUser(cityId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, undefined)
        ).tThrow(`userRole with value undefined is not a string`)
        )
    
        it('should fail on wrong data type', () =>
        expect(() =>
        logic.registerUser(cityId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, 123)
        ).toThrow(`userRole with value 123 is not a string`)
        )



    afterAll(() => mongoose.disconnect())
})