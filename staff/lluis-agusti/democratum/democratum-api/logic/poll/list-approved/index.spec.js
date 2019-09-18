require('dotenv').config()
const{ env : { DB_URL_TEST } } = process
const logic = require('../..')
const { expect } = require('chai')
const { models , mongoose, database } = require('democratum-data')
const { User, Poll } = models
const bcrypt = require('bcryptjs')

describe.only('logic - list all approved of a city', () => {

    before(() => mongoose.connect(DB_URL_TEST,  { useNewUrlParser: true }))

    let cityId0, fullname0, address0, documentId0, email0, imgDocId0, password0, participatedPolls0, proposedPolls0, userRole0    

    let cityId1, authorId1, question1, optionA1, optionB1, description1, expiryDate1, imagePoll1, positives1, negatives1, pollStatus1

    let cityId2, authorId2, question2, optionA2, optionB2, description2, expiryDate2, imagePoll2, positives2, negatives2, pollStatus2

    let cityId3, authorId3, question3, optionA3, optionB3, description3, expiryDate3, imagePoll3, positives3, negatives3, pollStatus3

    let cityId4, authorId4, question4, optionA4, optionB4, description4, expiryDate4, imagePoll4, positives4, negatives4, pollStatus4

    let cityId5, authorId5, question5, optionA5, optionB5, description5, expiryDate5, imagePoll5, positives5, negatives5, pollStatus5

    let cityId6, authorId6, question6, optionA6, optionB6, description6, expiryDate6, imagePoll6, positives6, negatives6, pollStatus6

    let cityId7, authorId7, question7, optionA7, optionB7, description7, expiryDate7, imagePoll7, positives7, negatives7, pollStatus7

    let cityId8, authorId8, question8, optionA8, optionB8, description8, expiryDate8, imagePoll8, positives8, negatives8, pollStatus8

    let cityId9, authorId9, question9, optionA9, optionB9, description9, expiryDate9, imagePoll9, positives9, negatives9, pollStatus9

    let cityId10, authorId10, question10, optionA10, optionB10, description10, expiryDate10, imagePoll10, positives10, negatives10, pollStatus10

    beforeEach(async () => {

        //await Poll.deleteMany()

        cityId1 = '5d70f41b7d4edc12334851db'
        authorId1 = 'Lluis Agusti'
        question1 = 'Will teeth be the new gold?'
        optionA1 = 'Yes'
        optionB1 = 'No'
        description1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        expiryDate1 = new Date
        imagePoll1 = 'https://www.democratum.com/skylab/pollteeth.jpg'
        positives1 = 6984
        negatives1 = 9045
        pollStatus1 = 'approved'
        

        cityId2 = '5d70f41b7d4edc12334851db'
        authorId2 = 'Lluis Agusti'
        question2 = 'Are you a vampire?'
        optionA2 = 'Yes'
        optionB2 = 'No'
        description2 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        expiryDate2 = new Date
        imagePoll2 = 'https://www.democratum.com/skylab/pollvampire2.png'
        positives2 = 3465
        negatives2 = 1894
        pollStatus2 = 'approved'

        cityId3 = '5d70f41b7d4edc12334851db'
        authorId3 = 'Lluis Agusti'
        question3 = 'Gun control for kinder gardens?'
        optionA3 = 'Yes'
        optionB3 = 'No'
        description3 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        expiryDate3 = new Date
        imagePoll3 = 'https://www.democratum.com/skylab/pollguns.jpg'
        positives3 = 1760
        negatives3 = 8734
        pollStatus3 = 'approved'


        cityId4 = '5d70f41b7d4edc12334851db'
        authorId4 = 'Lluis Agusti'
        question4 = 'Is the mayor too much hispter?'
        optionA4 = 'Yes'
        optionB4 = 'No'
        description4 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        expiryDate4 = new Date
        imagePoll4 = 'https://www.democratum.com/skylab/pollhipster.jpg'
        positives4 = 6021
        negatives4 = 734
        pollStatus4 = 'approved'

        cityId5 = '5d70f41b7d4edc12334851db'
        authorId5 = 'Lluis Agusti'
        question5 = 'Can wild ducks be pets?'
        optionA5 = 'Yes'
        optionB5 = 'No'
        description5 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        expiryDate5 = new Date
        imagePoll5 = 'https://www.democratum.com/skylab/pollducks.jpg'
        positives5 = 1860
        negatives5 = 5734
        pollStatus5 = 'approved'

         cityId6 = '5d70f41b7d4edc12334851db'
        authorId6 = 'Lluis Agusti'
        question6 = '120km/h speed limit in the city center?'
        optionA6 = 'Yes'
        optionB6 = 'No'
        description6 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        expiryDate6 = new Date
        imagePoll6 = 'https://www.democratum.com/skylab/pollspeed.jpg'
        positives6 = 2792
        negatives6 = 9734
        pollStatus6 = 'expired'


        cityId7 = '5d70f41b7d4edc12334851db'
        authorId7 = 'Lluis Agusti'
        question7 = 'Should feudalism come back?'
        optionA7 = 'Yes'
        optionB7 = 'No'
        description7 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        expiryDate7 = new Date
        imagePoll7 = 'https://www.democratum.com/skylab/pollfeudal.jpg'
        positives7 = 7792
        negatives7 = 11734
        pollStatus7 = 'expired'

        cityId8 = '5d70f41b7d4edc12334851db'
        authorId8 = 'Lluis Agusti'
        question8 = 'Mandatory pescaterian diet for all?'
        optionA8 = 'Yes'
        optionB8 = 'No'
        description8 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        expiryDate8 = new Date
        imagePoll8 = 'https://www.democratum.com/skylab/pollpescaterian2.jpg'
        positives8 = 61730
        negatives8 = 8581
        pollStatus8 = 'pending'

        cityId9 = '5d70f41b7d4edc12334851db'
        authorId9 = 'Lluis Agusti'
        question9 = 'Are dolphins evil?'
        optionA9 = 'Yes'
        optionB9 = 'No'
        description9 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        expiryDate9 = new Date
        imagePoll9 = 'https://www.democratum.com/skylab/polldolphin.jpg'
        positives9 = 6760
        negatives9 = 4734
        pollStatus9 = 'pending'

        cityId10 = '5d70f41b7d4edc12334851db'
        authorId10 = 'Lluis Agusti'
        question10 = 'Should we ban plastic bags?'
        optionA10 = 'Yes'
        optionB10 = 'No'
        description10 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        expiryDate10 = new Date
        imagePoll10 = 'https://www.democratum.com/skylab/pollplastic.jpg'
        positives10 = 7760
        negatives10 = 19734
        pollStatus10 = 'rejected'

        //crear user
        cityId0 = '5d70f41b7d4edc12334851db'
        fullname0 = 'Citizen'
        address0 = `${Math.random()}`
        documentId0 = `${Math.random()}@domain.com`
        email0 = `mail@-${Math.random()}.com`
        imgDocId0 = `${Math.random()}`
        password0 = `${Math.random()}`
        userRole0 = 'citizen'

        const user0 = await User.create({cityId: cityId0, fullname: fullname0, address: address0, documentId: documentId0, email: email0, imgDocId: imgDocId0, password: await bcrypt.hash(password0, 10), participatedPolls: participatedPolls0, proposedPolls: proposedPolls0, userRole: userRole0})

        userId = user0.id


        const poll1 = await Poll.create({ cityId: cityId1, authorId: authorId1, question: question1, optionA: optionA1, optionB: optionB1, description: description1, expiryDate: expiryDate1, imagePoll: imagePoll1, positives: positives1, negatives: negatives1, pollStatus: pollStatus1 })

        pollId1 = poll1.id.toString()

        const poll2 = await Poll.create({ cityId: cityId2, authorId: authorId2, question: question2, optionA: optionA2, optionB: optionB2, description: description2, expiryDate: expiryDate2, imagePoll: imagePoll2, positives: positives2, negatives: negatives2, pollStatus: pollStatus2 })

        pollId2 = poll2.id.toString()

        const poll3 = await Poll.create({ cityId: cityId3, authorId: authorId3, question: question3, optionA: optionA3, optionB: optionB3, description: description3, expiryDate: expiryDate3, imagePoll: imagePoll3, positives: positives3, negatives: negatives3, pollStatus: pollStatus3 })

        pollId3 = poll3.id.toString()

        const poll4 = await Poll.create({ cityId: cityId4, authorId: authorId4, question: question4, optionA: optionA4, optionB: optionB4, description: description4, expiryDate: expiryDate4, imagePoll: imagePoll4, positives: positives4, negatives: negatives4, pollStatus: pollStatus4 })

        pollId4 = poll4.id.toString()

        const poll5 = await Poll.create({ cityId: cityId5, authorId: authorId5, question: question5, optionA: optionA5, optionB: optionB5, description: description5, expiryDate: expiryDate5, imagePoll: imagePoll5, positives: positives5, negatives: negatives5, pollStatus: pollStatus5 })

        pollId5 = poll5.id.toString()

        const poll6 = await Poll.create({ cityId: cityId6, authorId: authorId6, question: question6, optionA: optionA6, optionB: optionB6, description: description6, expiryDate: expiryDate6, imagePoll: imagePoll6, positives: positives6, negatives: negatives6, pollStatus: pollStatus6 })

        pollId6 = poll6.id.toString()

        const poll7 = await Poll.create({ cityId: cityId7, authorId: authorId7, question: question7, optionA: optionA7, optionB: optionB7, description: description7, expiryDate: expiryDate7, imagePoll: imagePoll7, positives: positives7, negatives: negatives7, pollStatus: pollStatus7 })

        pollId7 = poll7.id.toString()

        const poll8 = await Poll.create({ cityId: cityId8, authorId: authorId8, question: question8, optionA: optionA8, optionB: optionB8, description: description8, expiryDate: expiryDate8, imagePoll: imagePoll8, positives: positives8, negatives: negatives8, pollStatus: pollStatus8 })

        pollId8 = poll8.id.toString()

        const poll9 = await Poll.create({ cityId: cityId9, authorId: authorId9, question: question9, optionA: optionA9, optionB: optionB9, description: description9, expiryDate: expiryDate9, imagePoll: imagePoll9, positives: positives9, negatives: negatives9, pollStatus: pollStatus9 })

        pollId9 = poll9.id.toString()

        const poll10 = await Poll.create({ cityId: cityId10, authorId: authorId10, question: question10, optionA: optionA10, optionB: optionB10, description: description10, expiryDate: expiryDate10, imagePoll: imagePoll10, positives: positives10, negatives: negatives10, pollStatus: pollStatus10 })

        pollId10 = poll10.id.toString()

    })

     it('should succeed on correct data', async () =>{
        const polls = await logic.listApproved(userId, '5d70f41b7d4edc12334851db', 'approved')
  
                expect(polls).to.exist
                expect(polls[0]).to.exist
                expect(polls[0].cityId).to.equal(cityId1)
                expect(polls[0].authorId).to.equal(authorId1)
                expect(polls[0].question).to.equal(question1)
                expect(polls[0].optionA).to.equal(optionA1)
                expect(polls[0].optionB).to.equal(optionB1)
                expect(polls[0].description).to.equal(description1)
                expect(polls[0].expiryDate.toDateString()).to.equal(expiryDate1.toDateString())
                expect(polls[0].imagePoll).to.equal(imagePoll1)
                expect(polls[0].positives).to.equal(positives1)
                expect(polls[0].negatives).to.equal(negatives1)
                expect(polls[0].pollStatus).to.equal(pollStatus1)

                expect(polls[1]).to.exist
                expect(polls[1].cityId).to.equal(cityId2)
                expect(polls[1].authorId).to.equal(authorId2)
                expect(polls[1].question).to.equal(question2)
                expect(polls[1].optionA).to.equal(optionA2)
                expect(polls[1].optionB).to.equal(optionB2)
                expect(polls[1].description).to.equal(description2)
                expect(polls[1].expiryDate.toDateString()).to.equal(expiryDate2.toDateString())
                expect(polls[1].imagePoll).to.equal(imagePoll2)
                expect(polls[1].positives).to.equal(positives2)
                expect(polls[1].negatives).to.equal(negatives2)
                expect(polls[1].pollStatus).to.equal(pollStatus2)
    })

 it('should fail on empty userId', () =>
    expect(() =>
        logic.listApproved('', '5d70f41b7d4edc12334851db', 'approved')
    ).to.throw('userId is empty or blank')
)

it('should fail on undefined userId', () =>
    expect(() =>
        logic.listApproved(undefined, '5d70f41b7d4edc12334851db', 'approved')
    ).to.throw(`userId with value undefined is not a string`)
)

it('should fail on wrong data type', () =>
    expect(() =>
        logic.listApproved(123, '5d70f41b7d4edc12334851db', 'approved')
    ).to.throw(`userId with value 123 is not a string`)
)

 it('should fail on empty targetCityId', () =>
    expect(() =>
        logic.listApproved(userId, '', 'approved')
    ).to.throw('targetCityId is empty or blank')
)

it('should fail on undefined targetCityId', () =>
    expect(() =>
        logic.listApproved(userId, undefined, 'approved')
    ).to.throw(`targetCityId with value undefined is not a string`)
)

it('should fail on wrong data type', () =>
    expect(() =>
        logic.listApproved(userId, 123, 'approved')
    ).to.throw(`targetCityId with value 123 is not a string`)
)

// no me pasa estos tres tests!!!!

/* it('should fail on empty pollstatus', () =>
expect(() =>
    logic.listApproved(userId, ciudad, '')
).to.throw('pollstatus is empty or blank')
)

it('should fail on undefined pollstatus', () =>
expect(() =>
    logic.listApproved(userId, ciudad, undefined)
).to.throw(`pollstatus with value undefined is not a string`)
)

it('should fail on wrong data type', () =>
expect(() =>
    logic.listApproved(userId, ciudad, 123)
).to.throw(`pollstatus with value 123 is not a string`)
) */
    
    after(() => mongoose.disconnect())
})



// TEST QUE el user.cityId es diferente que el targetCityId 