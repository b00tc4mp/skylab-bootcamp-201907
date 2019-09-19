require('dotenv').config()
const{ env : { DB_URL_TEST } } = process
const logic = require('../..')
const { expect } = require('chai')
const { models , mongoose, database } = require('democratum-data')
const { User, Poll } = models
const bcrypt = require('bcryptjs')

describe('logic - vote poll', () => {
    before(() => mongoose.connect(DB_URL_TEST,  { useNewUrlParser: true }))

    let cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus, pollId
    let cityId2, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole, userId

    let vote

    beforeEach(async() => {

        await Poll.deleteMany()
        await User.deleteMany()

        cityId = `VOTEPOLL-${Math.random()}`
        authorId = `vehmodel-${Math.random()}`
        question = `question-${Math.random()}`
        optionA = `optiona-${Math.random()}`
        optionB = `optionb-${Math.random()}`
        description = `description-${Math.random()}`
        expiryDate = new Date()
        imagePoll = `image-${Math.random()}`
        positives = 1
        negatives = 1
        pollStatus = 'rejected'

        fullname = `VOTEUSER-${Math.random()}`
        address = `address-${Math.random()}`
        documentId = `documentid-${Math.random()}@domain.com`
        email = `email@-${Math.random()}.com`
        imgDocId = `imgdocid-${Math.random()}`
        password= `password-${Math.random()}`
        participatedPolls = `partipolls-${Math.random()}`
        proposedPolls = ['k89236423894y2348', '12323']
        userRole = 'citizen'

        const user = await User.create({cityId, fullname, address, documentId, email, imgDocId, password, participatedPolls, proposedPolls, userRole})

        await user.save()

        userId = user.id

        const poll = await Poll.create({ cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus })

        pollId = poll.id

        /* const poll = new Poll ({ cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus, pollId }) */

        await poll.save()

    })
    
    it('should succeed on positive vote', async () => {
        const result = await logic.votePoll(userId, pollId, 'positive')

        //expect(result).to.not.exist

        const poll = await Poll.findById(pollId)
        expect(poll).to.exist
        expect(poll.positives).to.deep.equal(2)
    })

    it('should succeed on negative vote', async () => {
        const result = await logic.votePoll(userId, pollId, 'negative')

        //expect(result).to.not.exist

        const poll = await Poll.findById(pollId)
        expect(poll).to.exist
        expect(poll.negatives).to.deep.equal(2)
    })



     it('should fail on empty userId', () =>
    expect(() =>
    logic.votePoll('', pollId, vote)
    ).to.throw('userId is empty or blank')
    )

    it('should fail on undefined userId', () =>
        expect(() =>
        logic.votePoll(undefined, pollId, vote)
        ).to.throw(`userId with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
    expect(() =>
    logic.votePoll(123, pollId, vote)
    ).to.throw(`userId with value 123 is not a string`)
    )

    it('should fail on empty pollId', () =>
    expect(() =>
    logic.votePoll(userId, '', vote)
    ).to.throw('pollId is empty or blank')
    )

    it('should fail on undefined pollId', () =>
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
    logic.votePoll(pollId, userId, '')
    ).to.throw('vote is empty or blank')
    )

    it('should fail on undefined vote', () =>
        expect(() =>
        logic.votePoll(pollId, userId, undefined)
        ).to.throw(`vote with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
    expect(() =>
    logic.votePoll(pollId, userId, 123)
    ).to.throw(`vote with value 123 is not a string`)
    ) 

    after(() => mongoose.disconnect())
})