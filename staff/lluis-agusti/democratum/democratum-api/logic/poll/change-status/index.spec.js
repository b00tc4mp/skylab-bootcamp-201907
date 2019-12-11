require('dotenv').config()
const{ env : { DB_URL_TEST } } = process
const logic = require('../..')
const { expect } = require('chai')
const { models , mongoose, database } = require('democratum-data')
const { User, Poll } = models

describe('logic - change status', () => {
    before(() => mongoose.connect(DB_URL_TEST,  { useNewUrlParser: true }))

    let cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus, pollId
    let cityId2, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole, userId

    let newStatus

    beforeEach(async() => {

        //await Poll.deleteMany()
        //await User.deleteMany()

        cityId = `CHANGER-${Math.random()}`
        authorId = `vehmodel-${Math.random()}`
        question = `question-${Math.random()}`
        optionA = `optiona-${Math.random()}`
        optionB = `optionb-${Math.random()}`
        description = `description-${Math.random()}`
        expiryDate = new Date()
        imagePoll = `image-${Math.random()}`
        positives = 1
        negatives = 1
        pollStatus = 'pending'

        cityId2 = `CHANGER-${Math.random()}`
        fullname = `lluis.agusti-${Math.random()}`
        address = `address-${Math.random()}`
        documentId = `documentid-${Math.random()}@domain.com`
        email = `email@-${Math.random()}.com`
        imgDocId = `imgdocid-${Math.random()}`
        password = `password-${Math.random()}`
        participatedPolls = `partipolls-${Math.random()}`
        proposedPolls = ['k89236423894y2348', '12323']
        userRole = 'citizen'

        const user = await User.create({cityId : cityId2, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole})
        userId = user.id

        /* const poll = await Poll.create({ cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus })
        pollId = poll.id */

        const poll = new Poll ({ cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus, pollId })

        await poll.save()
        pollId = poll.id

    })
    
    it('should succeed on change to rejected', async () => {
        newStatus = 'rejected'
        const result = await logic.changeStatus(userId, pollId, newStatus)

        expect(result).to.exist

        const poll = await Poll.findById(pollId)
        expect(poll).to.exist
        expect(poll.pollStatus).to.equal('rejected')
    })
    
    it('should succeed on change to approved', async () => {
        newStatus = 'approved'
        const result = await logic.changeStatus(userId, pollId, newStatus)

        expect(result).to.exist

        const poll = await Poll.findById(pollId)
        expect(poll).to.exist
        expect(poll.pollStatus).to.equal('approved')
    })

    it('should succeed on change to expired', async () => {
        newStatus = 'expired'
        const result = await logic.changeStatus(userId, pollId, newStatus)

        expect(result).to.exist

        const poll = await Poll.findById(pollId)
        expect(poll).to.exist
        expect(poll.pollStatus).to.equal('expired')
    })

    it('should succeed on change to pending', async () => {
        newStatus = 'pending'
        const result = await logic.changeStatus(userId, pollId, newStatus)

        expect(result).to.exist

        const poll = await Poll.findById(pollId)
        expect(poll).to.exist
        expect(poll.pollStatus).to.equal('pending')
    })

    it('should fail on non valid word', async () => {
        newStatus = 'wrongword'

        try {
            await logic.changeStatus(userId, pollId, newStatus)
            throw new Error('should not arrive here')
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('non valid newStatus')
        }
    })


     it('should fail on empty userId', () =>
    expect(() =>
    logic.changeStatus('', pollId, newStatus)
    ).to.throw('userId is empty or blank')
    ) /*

    it('should fail on undefined userId', () =>
    expect(() =>
    logic.changeStatus(undefined, pollId, newStatus)
    ).to.throw('userId is empty or blank')
    )

    it('should fail on empty userId', () =>
    expect(() =>
    logic.votePoll(userId, '', vote)
    ).to.throw('pollId is empty or blank')
    )

    it('should fail on undefined userId', () =>
        expect(() =>
        logic.votePoll(userId, undefined, vote)
        ).to.throw(`pollId with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
    expect(() =>
    logic.votePoll(userId, 123, vote)
    ).to.throw(`pollId with value 123 is not a string`)
    )

    it('should fail on empty vote', () =>
    expect(() =>
    logic.votePoll(userId, pollId, '')
    ).to.throw('vote is empty or blank')
    )

    it('should fail on undefined vote', () =>
        expect(() =>
        logic.votePoll(userId, pollId, undefined)
        ).to.throw(`vote with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
    expect(() =>
    logic.votePoll(userId, pollId, 123)
    ).to.throw(`vote with value 123 is not a string`)
    ) */

    after(() => mongoose.disconnect())
})