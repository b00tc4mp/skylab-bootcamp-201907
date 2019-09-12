const logic = require('../..')
const { expect } = require('chai')
const { models , mongoose } = require('democratum-data')
const bcrypt = require ('bcryptjs')
const { User } = models

describe('logic - update citizen', () => {

    before(() =>  mongoose.connect('mongodb://localhost/democratum-test', { useNewUrlParser: true }))

    let cityId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole

    beforeEach(async () => {

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

        data = {
            cityId1: `UPDATEEEEEED-${Math.random()}`,
            fullname1: `UPDATEEEEEED-${Math.random()}`,
            address1: `UPDATEEEEEED-${Math.random()}`,
            documentId1: `UPDATEEEEEED-${Math.random()}`,
            //email1: `updated@-${Math.random()}.com`,
            imgDocId1: `UPDATEEEEEED-${Math.random()}`,
            password1: `UPDATEEEEEED-${Math.random()}`,
            participatedPolls1: `UPDATEEEEEED-${Math.random()}`,
            proposedPolls1: `UPDATEEEEEED-${Math.random()}`,
            userRole1: 'citizen'
        }

            const hash = await bcrypt.hash(password, 10)

            const user = await User.create({cityId, fullname, address, documentId, email, imgDocId, password: hash, participatedPolls, proposedPolls, userRole})

            id = user.id
    })

    it('should succeed on correct data', async () =>{
        const response = await logic.updateUser(id, data)

            expect(response).not.to.exist

            return ( async () => {
            
            const user = await User.findById(id)
           
                expect(user).to.exist
                expect(user.cityId).to.equal(body.cityId1)
                expect(user.fullname).to.equal(body.fullname1)
                expect(user.address).to.equal(body.address1)
                expect(user.documentId).to.equal(body.documentId1)
                expect(user.email).to.equal(body.email)
                expect(user.imgDocId).to.equal(body.imgDocId1)
                expect(user.password).to.exist
                expect(user.participatedPolls).to.equal(body.participatedPolls1)
                expect(user.proposedPolls).to.equal(body.proposedPolls1)
                expect(user.userRole).to.equal(body.userRole1)


        })
    })

    it('should fail on non-existing user', async () => {
        id = '5d5d5530531d455f75da9fF9'
        try{
            await logic.updateUser(id, data)
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
    logic.updateUser("", data)
    ).to.throw('id is empty or blank')
    )
    it('should fail on undefined id', () =>
        expect(() =>
        logic.updateUser(undefined, data)
        ).to.throw(`id with value undefined is not a string`)
    )

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
