const logic = require('../../../logic')
const { expect } = require('chai')
const { database, models } = require('wannadog-data')
const { User } = models

describe('logic - register user', () => {

    before(() => database.connect('mongodb://172.17.0.2/wannadog-test'))

    let name, surname, email, password, longitude, latitude

    beforeEach(() => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`
        longitude = Number((Math.random() * (-180, 180)).toFixed(3) * 1)
        latitude = Number((Math.random() * (-90, 90)).toFixed(3) * 1)

        // return (async () => await User.deleteMany())()
    })

    it('should succeed on correct data', async () => {

        latitude = 41.398457
        longitude = 2.1998465

        const result = await logic.registerUser(name, surname, email, password, longitude, latitude)
        expect(result).not.to.exist
        const user = await User.findOne({ email, password })
        const { name: _name, surname: _surname, email: _email, password: _password, location: { coordinates } } = user
        expect(user).to.exist
        expect(_name).to.equal(name)
        expect(_surname).to.equal(surname)
        expect(_email).to.equal(email)
        expect(_password).to.equal(password)
        expect(coordinates[0]).to.equal(longitude)
        expect(coordinates[1]).to.equal(latitude)
    })

    it('should fail if the user already exists', async () => {

        const newUser = new User({ name, surname, email, password })
        newUser.location.coordinates.push(longitude, latitude)
        await newUser.save()

        try {
            await logic.registerUser(name, surname, email, password, longitude, latitude)
        } catch ({ message }) {
            expect(message).to.exist
            expect(message).to.equal(`User already exists.`)
        }
    })

    /* Name */
    it('should fail on empty name', () =>
        expect(() =>
            logic.registerUser('', surname, email, password, longitude, latitude)
        ).to.throw('name is empty or blank')
    )

    it('should fail on undefined name', () =>
        expect(() =>
            logic.registerUser(undefined, surname, email, password, longitude, latitude)
        ).to.throw(`name with value undefined is not a string`)
    )

    it('should fail on wrong data type for name', () =>
        expect(() =>
            logic.registerUser(123, surname, email, password, longitude, latitude)
        ).to.throw(`name with value 123 is not a string`)
    )

    /* Surname */
    it('should fail on empty surname', () =>
        expect(() =>
            logic.registerUser(name, '', email, password, longitude, latitude)
        ).to.throw('surname is empty or blank')
    )

    it('should fail on undefined surname', () =>
        expect(() =>
            logic.registerUser(name, undefined, email, password, longitude, latitude)
        ).to.throw(`surname with value undefined is not a string`)
    )

    it('should fail on wrong data type for surname', () =>
        expect(() =>
            logic.registerUser(name, 123, email, password, longitude, latitude)
        ).to.throw(`surname with value 123 is not a string`)
    )


    /* Email */
    it('should fail on empty email', () =>
        expect(() =>
            logic.registerUser(name, surname, '', password, longitude, latitude)
        ).to.throw('email is empty or blank')
    )

    it('should fail on undefined surname', () =>
        expect(() =>
            logic.registerUser(name, surname, undefined, password, longitude, latitude)
        ).to.throw(`email with value undefined is not a string`)
    )

    it('should fail on wrong data type for email', () =>
        expect(() =>
            logic.registerUser(name, surname, 123, password, longitude, latitude)
        ).to.throw(`email with value 123 is not a string`)
    )

    it('should fail on wrong email format', () =>
        expect(() =>
            logic.registerUser(name, surname, 'a@a', password, longitude, latitude)
        ).to.throw(`email with value a@a is not a valid e-mail`)
    )

    /* Password */
    it('should fail on empty password', () =>
        expect(() =>
            logic.registerUser(name, surname, email, '')
        ).to.throw('password is empty or blank')
    )

    it('should fail on undefined password', () =>
        expect(() =>
            logic.registerUser(name, surname, email, undefined, longitude, latitude)
        ).to.throw(`password with value undefined is not a string`)
    )

    it('should fail on wrong data type for password', () =>
        expect(() =>
            logic.registerUser(name, surname, email, 123, longitude, latitude)
        ).to.throw(`password with value 123 is not a string`)
    )
    /*Longitude*/
    it('should fail on empty longitude', () =>
        expect(() =>
            logic.registerUser(name, surname, email, password, '', latitude)
        ).to.throw('longitude is empty or blank')
    )

    it('should fail on undefined longitude', () =>
        expect(() =>
            logic.registerUser(name, surname, email, password, undefined, latitude)
        ).to.throw('longitude with value undefined is not a number')
    )

    it('should fail on wrong data type for longitude', () =>
        expect(() =>
            logic.registerUser(name, surname, email, password, 'hello', latitude)
        ).to.throw('longitude with value hello is not a number')
    )

    /*Latitude*/
    it('should fail on empty latitude', () =>
        expect(() =>
            logic.registerUser(name, surname, email, password, longitude, '')
        ).to.throw('latitude is empty or blank')
    )

    it('should fail on undefined latitude', () =>
        expect(() =>
            logic.registerUser(name, surname, email, password, longitude, undefined)
        ).to.throw('latitude with value undefined is not a number')
    )

    it('should fail on wrong data type for latitude', () =>
        expect(() =>
            logic.registerUser(name, surname, email, password, longitude, 'hello')
        ).to.throw('latitude with value hello is not a number')
    )

    after(() => database.disconnect())
})