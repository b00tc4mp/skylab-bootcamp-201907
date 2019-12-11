const { expect } = require('chai')
const bcrypt = require('bcryptjs')
const logic = require('../../.')
const { models: { User } } = require('wody-data')
const { random, floor } = Math
const { database } = require('wody-data')

describe('logic - register user', () => {
    before(() => database.connect('mongodb://localhost/wody-server-test', { useNewUrlParser: true }))

    let name, surname, email, password, gender, birthday, weight, height, goal, fitnesslevel

    let genderRandom = ['male', 'female']
    let fitnessLvlRandom = ['low', 'mid', 'high']
    let goalRandom = ['lose', 'fit', 'gain']
    let rand = (param) => floor(random() * param.length)

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@domain.com`
        password = '`password-${random()}`'
        gender = genderRandom[rand(genderRandom)]
        fitnesslevel = fitnessLvlRandom[rand(fitnessLvlRandom)]
        goal = goalRandom[rand(goalRandom)]
        birthday = '29/06/1984'
        weight = floor(random() * ((130 - 50) + 1) + 50)
        height = floor(random() * ((215 - 50) + 1) + 50)

        await User.deleteMany()
    })

    //validations

    it('should fail on empty name', () =>
        expect(() =>
            logic.registerUser('', surname, email, password, gender, birthday, weight, height, goal, fitnesslevel)
        ).to.throw('name is empty or blank')
    )

    it('should fail on undefined name', () =>
        expect(() =>
            logic.registerUser(undefined, surname, email, password, gender, birthday, weight, height, goal, fitnesslevel)
        ).to.throw(`name with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerUser(123456798, surname, email, password, gender, birthday, weight, height, goal, fitnesslevel)
        ).to.throw(`name with value 123456798 is not a string`)
    )

    //surname

    it('should fail on empty surname', () =>
        expect(() =>
            logic.registerUser(name, '', email, password, gender, birthday, weight, height, goal, fitnesslevel)
        ).to.throw('surname is empty or blank')
    )

    it('should fail on undefined surname', () =>
        expect(() =>
            logic.registerUser(name, undefined, email, password, gender, birthday, weight, height, goal, fitnesslevel)
        ).to.throw(`surname with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerUser(name, 123456798, email, password, gender, birthday, weight, height, goal, fitnesslevel)
        ).to.throw(`surname with value 123456798 is not a string`)
    )

    //email
    it('should fail on empty email', () =>
        expect(() =>
            logic.registerUser(name, surname, '', password, gender, birthday, weight, height, goal, fitnesslevel)
        ).to.throw('email is empty or blank')
    )

    it('should fail on undefined email', () =>
        expect(() =>
            logic.registerUser(name, surname, undefined, password, gender, birthday, weight, height, goal, fitnesslevel)
        ).to.throw(`email with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerUser(name, surname, 123456798, password, gender, birthday, weight, height, goal, fitnesslevel)
        ).to.throw(`email with value 123456798 is not a string`)
    )

    //password
    it('should fail on empty password', () =>
        expect(() =>
            logic.registerUser(name, surname, email, '', gender, birthday, weight, height, goal, fitnesslevel)
        ).to.throw('password is empty or blank')
    )

    it('should fail on undefined password', () =>
        expect(() =>
            logic.registerUser(name, surname, email, undefined, gender, birthday, weight, height, goal, fitnesslevel)
        ).to.throw(`password with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerUser(name, surname, email, 123456798, gender, birthday, weight, height, goal, fitnesslevel)
        ).to.throw(`password with value 123456798 is not a string`)
    )

    it('should fail on empty gender', () =>
        expect(() =>
            logic.registerUser(name, surname, email, password, '', birthday, weight, height, goal, fitnesslevel)
        ).to.throw('gender is empty or blank')
    )


    it('should fail on wrong data type', () =>
        expect(() =>
            logic.registerUser(name, surname, email, password, 123456798, birthday, weight, height, goal, fitnesslevel)
        ).to.throw(`gender with value 123456798 is not a string`)
    )


    it('should fail on empty birthday', () =>
        expect(() =>
            logic.registerUser(name, surname, email, password, gender, '', weight, height, goal, fitnesslevel)
        ).to.throw('birthday is empty or blank')
    )


    it('should fail on wrong data birthday', () =>
        expect(() =>
            logic.registerUser(name, surname, email, password, gender, 123456798, weight, height, goal, fitnesslevel)
        ).to.throw(`birthday with value 123456798 is not a string`)
    )

    it('should fail on empty weight', () =>
        expect(() =>
            logic.registerUser(name, surname, email, password, gender, birthday, '', height, goal, fitnesslevel)
        ).to.throw('weight is empty or blank')
    )


    it('should fail on wrong data weight', () =>
        expect(() =>
            logic.registerUser(name, surname, email, password, gender, birthday, 'abcde', height, goal, fitnesslevel)
        ).to.throw(`weight with value abcde is not a number`)
    )


    it('should fail on empty height', () =>
        expect(() =>
            logic.registerUser(name, surname, email, password, gender, birthday, weight, '', goal, fitnesslevel)
        ).to.throw('height is empty or blank')
    )


    it('should fail on wrong data height', () =>
        expect(() =>
            logic.registerUser(name, surname, email, password, gender, birthday, weight, 'abcd', goal, fitnesslevel)
        ).to.throw(`height with value abcd is not a number`)
    )

    it('should fail on empty goal', () =>
        expect(() =>
            logic.registerUser(name, surname, email, password, gender, birthday, weight, height, '', fitnesslevel)
        ).to.throw('goal is empty or blank')
    )


    it('should fail on wrong data goal', () =>
        expect(() =>
            logic.registerUser(name, surname, email, password, gender, birthday, weight, height, 12345, fitnesslevel)
        ).to.throw(`goal with value 12345 is not a string`)
    )

    it('should fail on empty fitnesslevel', () =>
        expect(() =>
            logic.registerUser(name, surname, email, password, gender, birthday, weight, height, goal, '')
        ).to.throw('fitnesslevel is empty or blank')
    )


    it('should fail on wrong data fitnesslevel', () =>
        expect(() =>
            logic.registerUser(name, surname, email, password, gender, birthday, weight, height, goal, 12345)
        ).to.throw(`fitnesslevel with value 12345 is not a string`)
    )





    //fitnessLevel, goal and exp are not necessary to validate. User only hits a button with a pre-defined value

    it('should succeed on correct data', async () => {

        const result = await logic.registerUser(name, surname, email, password, gender, birthday, weight, height, goal, fitnesslevel)

        expect(result).to.exist

        const user = await User.findOne({ email })

        expect(user).to.exist
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.gender).to.equal(gender)
        expect(user.birthday).to.equal(birthday)
        expect(user.weight).to.equal(weight)
        expect(user.height).to.equal(height)
        expect(user.fitnesslevel).to.equal(fitnesslevel)
        expect(user.goal).to.equal(goal)

        const match = await bcrypt.compare(password, user.password)
        expect(match).to.true

    })

    it('should fail on wrong birthday format', async () => {
        try {
            await logic.registerUser(name, surname, email, password, gender, '1984/6/25', weight, height, goal, fitnesslevel)
        } catch (error) {
            expect(error._message).to.equal('User validation failed')
        }
    })

    describe('logic - Existing user case', () => {

        beforeEach(async () => {

            let body = {
                name: 'Pepito',
                surname: 'Grillo',
                email: 'pepitogrillo@mail.com',
                password: '1615616',
                gender: 'male',
                birthday: '29/06/1984',
                weight: 85,
                height: 188,
                goal: 'gain',
                fitnesslevel: 'mid'
            }
            await User.create(body)


        })
        it('should fail if user exists', async () => {
            try {
                await logic.registerUser('Pepito', 'Grillo', 'pepitogrillo@mail.com', '1615616', 'male', '29/06/1984', 85, 188, 'gain', 'mid')
            } catch ({ message }) {
                expect(message).to.equal('user already exist')
            }
        })

    })
    after(() => database.disconnect())
})