require('dotenv').config()
const{ env : { DB_URL_TEST } } = process
const logic = require('../..')
const { expect } = require('chai')
const { models , mongoose, database } = require('democratum-data')
const { User, Poll } = models
const bcrypt = require('bcryptjs')

describe('logic - create new poll', () => {

    before(() =>  mongoose.connect(DB_URL_TEST, { useNewUrlParser: true }))
        
    let cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus, id

    beforeEach(async () => {

        await Poll.deleteMany()

        cityId = `NEWPOOOOOOLL-${Math.random()}`
        authorId = `authorid-${Math.random()}`
        question = `question-${Math.random()}`
        optionA = `optiona-${Math.random()}`
        optionB = `optionb-${Math.random()}@domain.com`
        description = `email@-${Math.random()}.com`
        expiryDate = new Date()
        imagePoll = `password-${Math.random()}`
        positives = 1
        negatives = 1
        pollStatus = 'pending'

    })

    it('should succeed on correct data', async () => {

        const result = await logic.newPoll(cityId, authorId, question, optionA, optionB, description, expiryDate.toDateString(), imagePoll, positives, negatives, pollStatus, id )
    
        expect(result).to.exist
        const poll = await Poll.findOne({ question })
    
        expect(poll).to.exist
        expect(poll.cityId).to.equal(cityId)
        expect(poll.authorId).to.equal(authorId)
        expect(poll.question).to.equal(question)
        expect(poll.optionA).to.equal(optionA)
        expect(poll.optionB).to.equal(optionB)
        expect(poll.description).to.equal(description)
        expect(poll.expiryDate.toDateString()).to.equal(expiryDate.toDateString())
        expect(poll.imagePoll).to.equal(imagePoll)
        expect(poll.positives).to.equal(Number(positives))
        expect(poll.negatives).to.deep.equal(Number(negatives))
        expect(poll.pollStatus).to.equal('pending')

    })
// cityId

it('should fail on empty cityId', () =>
    expect(() =>
        logic.newPoll('', authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)
    ).to.throw('cityId is empty or blank')
)

it('should fail on undefined cityId', () =>
    expect(() =>
        logic.newPoll(undefined, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)
    ).to.throw(`cityId with value undefined is not a string`)
)

it('should fail on wrong data type', () =>
    expect(() =>
        logic.newPoll(123, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)
    ).to.throw(`cityId with value 123 is not a string`)
)

// authorId

it('should fail on empty authorId', () =>
    expect(() =>
        logic.newPoll(cityId, '', question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)
    ).to.throw('authorId is empty or blank')
)

it('should fail on undefined authorId', () =>
    expect(() =>
        logic.newPoll(cityId, undefined, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)
    ).to.throw(`authorId with value undefined is not a string`)
)

it('should fail on wrong data type', () =>
    expect(() =>
        logic.newPoll(cityId, 123, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)
    ).to.throw(`authorId with value 123 is not a string`)
)

// question

it('should fail on empty question', () =>
    expect(() =>
        logic.newPoll(cityId, authorId, '', optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)
    ).to.throw('question is empty or blank')
)

it('should fail on undefined question', () =>
    expect(() =>
        logic.newPoll(cityId, authorId, undefined, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)
    ).to.throw(`question with value undefined is not a string`)
)

it('should fail on wrong data type', () =>
    expect(() =>
        logic.newPoll(cityId, authorId, 123, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)
    ).to.throw(`question with value 123 is not a string`)
)

// optionA

it('should fail on empty optionA', () =>
    expect(() =>
        logic.newPoll(cityId, authorId, question, '', optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)
    ).to.throw('optionA is empty or blank')
)

it('should fail on undefined optionA', () =>
    expect(() =>
        logic.newPoll(cityId, authorId, question, undefined, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)
    ).to.throw(`optionA with value undefined is not a string`)
)

it('should fail on wrong data type', () =>
    expect(() =>
        logic.newPoll(cityId, authorId, question, 123, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)
    ).to.throw(`optionA with value 123 is not a string`)
)

// optionB

it('should fail on empty optionB', () =>
    expect(() =>
        logic.newPoll(cityId, authorId, question, optionA, '', description, expiryDate, imagePoll, positives, negatives, pollStatus)
    ).to.throw('optionB is empty or blank')
)

it('should fail on undefined optionB', () =>
    expect(() =>
        logic.newPoll(cityId, authorId, question, optionA, undefined, description, expiryDate, imagePoll, positives, negatives, pollStatus)
    ).to.throw(`optionB with value undefined is not a string`)
)

it('should fail on wrong data type', () =>
    expect(() =>
        logic.newPoll(cityId, authorId, question, optionA, 123, description, expiryDate, imagePoll, positives, negatives, pollStatus)
    ).to.throw(`optionB with value 123 is not a string`)
)

// description

it('should fail on empty description', () =>
    expect(() =>
        logic.newPoll(cityId, authorId, question, optionA, optionB, '', expiryDate, imagePoll, positives, negatives, pollStatus)
    ).to.throw('description is empty or blank')
)

it('should fail on undefined description', () =>
    expect(() =>
        logic.newPoll(cityId, authorId, question, optionA, optionB, undefined, expiryDate, imagePoll, positives, negatives, pollStatus)
    ).to.throw(`description with value undefined is not a string`)
)

it('should fail on wrong data type', () =>
    expect(() =>
        logic.newPoll(cityId, authorId, question, optionA, optionB, 123, expiryDate, imagePoll, positives, negatives, pollStatus)
    ).to.throw(`description with value 123 is not a string`)
)

// imagePoll

it('should fail on empty imagePoll', () =>
    expect(() =>
        logic.newPoll(cityId, authorId, question, optionA, optionB, description, expiryDate, '', positives, negatives, pollStatus)
    ).to.throw('imagePoll is empty or blank')
)

it('should fail on undefined imagePoll', () =>
    expect(() =>
        logic.newPoll(cityId, authorId, question, optionA, optionB, description, expiryDate, undefined, positives, negatives, pollStatus)
    ).to.throw(`imagePoll with value undefined is not a string`)
)

it('should fail on wrong data type', () =>
    expect(() =>
        logic.newPoll(cityId, authorId, question, optionA, optionB, description, expiryDate, 123, positives, negatives, pollStatus)
    ).to.throw(`imagePoll with value 123 is not a string`)
)

// pollStatus

it('should fail on empty pollStatus', () =>
    expect(() =>
        logic.newPoll(cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, '')
    ).to.throw('pollStatus is empty or blank')
)

it('should fail on undefined imagePoll', () =>
    expect(() =>
        logic.newPoll(cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, undefined)
    ).to.throw(`pollStatus with value undefined is not a string`)
)

it('should fail on wrong data type', () =>
    expect(() =>
        logic.newPoll(cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, 123)
    ).to.throw(`pollStatus with value 123 is not a string`)
)




after(() => mongoose.disconnect())
})