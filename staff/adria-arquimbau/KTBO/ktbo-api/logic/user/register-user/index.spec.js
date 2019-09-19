require('dotenv').config()

const { expect } = require('chai')
const registerUser = require('.')
const { database, models: { User } } = require('ktbo-data')
const { random: {  value } } = require('ktbo-utils')
const { random } = Math
const bcrypt = require('bcryptjs')


const { env: { DB_URL_TEST }} = process

describe('logic - register user', () => {
    before(() => database.connect(DB_URL_TEST))

    let company, country, email, password, role, userAdminId
    let companyNew, countryNew, emailNew, passwordNew, roleNew
    let userRegularId

    beforeEach(async () => {

        company = `company-${random()}`
        country = `country-${random()}`
        email = `email-${random()}@domain.com`
        password = `password-${random()}`
        role = value('admin')

        companyNew = `company-${random()}`
        countryNew = `country-${random()}`
        emailNew = `email-${random()}@domain.com`
        passwordNew = `password-${random()}`
        roleNew = value('admin', 'regular')


        await User.deleteMany()
        const userAdmin = await User.create({ company, country, email, password: await bcrypt.hash(password, 10), role })

        const userRegular = await User.create({ company, country, email, password: await bcrypt.hash(password, 10) })

        userAdmin._id = userAdmin.id
        userAdminId = userAdmin.id

        userRegular._id = userRegular.id
        userRegularId = userRegular.id
    })

    it('should succeed on correct data', async () => {
        const result = await registerUser(userAdminId, companyNew, countryNew, emailNew, passwordNew, roleNew)
         
                expect(result).to.exist
                expect(result.company).to.equal(companyNew)
                expect(result.country).to.equal(countryNew)
                expect(result.email).to.equal(emailNew)
                //expect(result.password).to.equal(passwordNew)
                expect(result.role).to.equal(roleNew)

                const match = await bcrypt.compare(passwordNew, result.password)

                expect(match).to.be.true
            
    })

    it('should fail on duplicate email', async () => {
        try {
           await registerUser(userAdminId, companyNew, countryNew, emailNew, passwordNew, roleNew)
            await registerUser(userAdminId, companyNew, countryNew, emailNew, passwordNew, roleNew)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`user with e-mail ${emailNew} already exists`)
        }
    })

    it('should fail on empty company', async () => {
        try {
            registerUser(userAdminId, '', countryNew, emailNew, passwordNew, roleNew)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`company is empty or blank`)
        }
    })

    it('should fail on empty country', async () => {
        try {
            registerUser(userAdminId, companyNew, '', emailNew, passwordNew, roleNew)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`country is empty or blank`)
        }
    })

    it('should fail on empty password', async () => {
        try {
            registerUser(userAdminId, companyNew, country, emailNew, '', roleNew)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`password is empty or blank`)
        }
    })


    it('should fail when company is a number', async() => {
        try {
            registerUser(userAdminId, 123, country, emailNew, passwordNew, roleNew)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`company with value 123 is not a string`) 
        }
    })

    it('should fail when company is an object', async() => {
        try {
            registerUser(userAdminId, {}, country, emailNew, passwordNew, roleNew)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`company with value [object Object] is not a string`) 
        }
    })

    it('should fail when company is an array', async() => {
        try {
            registerUser(userAdminId, [1,2,3], country, emailNew, passwordNew, roleNew)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`company with value 1,2,3 is not a string`) 
        }
    })

    it('should fail when company is a boolean', async() => {
        try {
            registerUser(userAdminId, true, country, emailNew, passwordNew, roleNew)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`company with value true is not a string`) 
        }
    })
    
    it('should fail when country is a number', async() => {
        try {
            registerUser(userAdminId, company, 123, emailNew, passwordNew, roleNew)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`country with value 123 is not a string`) 
        }
    })

    it('should fail when country is an object', async() => {
        try {
            registerUser(userAdminId, company, {}, emailNew, passwordNew, roleNew)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`country with value [object Object] is not a string`) 
        }
    })

    it('should fail when country is an array', async() => {
        try {
            registerUser(userAdminId, company, [1,2,3], emailNew, passwordNew, roleNew)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`country with value 1,2,3 is not a string`) 
        }
    })

    it('should fail when country is a boolean', async() => {
        try {
            registerUser(userAdminId, company, true, emailNew, passwordNew, roleNew)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`country with value true is not a string`) 
        }
    })

    it('should fail when e-mail is a number', async() => {
        try {
            registerUser(userAdminId, company, country, 123, passwordNew, roleNew)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`e-mail with value 123 is not a string`) 
        }
    })

    it('should fail when e-mail is an object', async() => {
        try {
            registerUser(userAdminId, company, country, {}, passwordNew, roleNew)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`e-mail with value [object Object] is not a string`) 
        }
    })

    it('should fail when e-mail is an array', async() => {
        try {
            registerUser(userAdminId, company, country, [1,2,3], passwordNew, roleNew)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`e-mail with value 1,2,3 is not a string`) 
        }
    })

    it('should fail when e-mail is a boolean', async() => {
        try {
            registerUser(userAdminId, company, country, true, passwordNew, roleNew)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`e-mail with value true is not a string`) 
        }
    })

    it('should fail when password is a number', async() => {
        try {
            registerUser(userAdminId, company, country, email, 123, roleNew)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`password with value 123 is not a string`) 
        }
    })

    it('should fail when password is an object', async() => {
        try {
            registerUser(userAdminId, company, country, email, {}, roleNew)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`password with value [object Object] is not a string`) 
        }
    })

    it('should fail when password is an array', async() => {
        try {
            registerUser(userAdminId, company, country, email, [1,2,3], roleNew)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`password with value 1,2,3 is not a string`) 
        }
    })

    it('should fail when password is a boolean', async() => {
        try {
            registerUser(userAdminId, company, country, email, true, roleNew)            
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`password with value true is not a string`) 
        }
    })

    it('should fail on Regular user Role', async () => {
        try {
            await registerUser(userRegularId, companyNew, country, emailNew, passwordNew, roleNew)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`User with id ${userRegularId} is not an admin`)
        }
    }) 

    after(() => database.disconnect())
})