require('dotenv').config()

const { expect } = require('chai')
const registerVehicle = require('.')
const { database, models: { User, Vehicle } } = require('../../data')
const { number, boolean, value } = require('../../utils/random')
const { random } = Math

const { env: { DB_URL_TEST }} = process

describe('logic - register vehicle', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, password, id, brand, model, license, year, type, color, electric

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@domain.com`
        password = `password-${random()}`

        brand = `brand-${random()}`
        model = `model-${random()}`
        license = `license-${random()}`
        year = number(1900, 2019)
        color = `color-${random()}`
        type = value('tourism', 'suv', 'van', 'coupe', 'cabrio', 'roadster', 'truck')
        electric = boolean()

        return User.deleteMany()
            .then(() => User.create({ name, surname, email, password }))
            .then(user => id = user.id)
    })

    it('should succeed on correct data', () =>
        registerVehicle(id, brand, model, license, year, type, color, electric)
            .then(_id => {
                expect(_id).to.be.a('string')

                return Promise.all([User.findById(id), Vehicle.findById(_id)])
            })
            .then(([user, vehicle]) => {
                expect(user).to.exist
                expect(vehicle).to.exist
                
                const { owner } = vehicle

                expect(user.id).to.equal(owner.toString())
                expect(vehicle.brand).to.equal(brand)
                expect(vehicle.model).to.equal(model)
                expect(vehicle.license).to.equal(license)
                expect(vehicle.year).to.equal(year)
                expect(vehicle.type).to.equal(type)
                expect(vehicle.color).to.equal(color)
                expect(vehicle.electric).to.equal(electric)
            })
    )

    after(() => database.disconnect())
})