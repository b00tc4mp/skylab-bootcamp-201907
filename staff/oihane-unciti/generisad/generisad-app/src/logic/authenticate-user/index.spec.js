import logic from '..'

import { database, models } from 'generisad-data'
const jwt = require('jsonwebtoken') 
import bcrypt from 'bcryptjs'

const { User, Advertisement, Merchant } = models

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

const { random } = Math

describe('logic-authenticate user', ()=>{
    
    
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))
    
    let name, surname, email, password, id
    let domain, name_domain, merchant
    let token
    
    beforeEach( async ()=>{
        
        name_domain = `name_domain-${Math.random()}`
        domain = `domain-${Math.random()}`

        await Merchant.deleteMany()
        const _merchant = await Merchant.create({ name: name_domain, domain })
        merchant = _merchant.id

        name= `name-${random()}`
        surname= `surname-${random()}`
        email= `email-${random()}@mail.com`
        password= `password-${random()}`
        
        await User.deleteMany()

        const hash = await bcrypt.hash(password, 10)

        const user = await User.create({ name, surname, email, password: hash, merchant_owner: merchant })

        id = user.id
})
    it('should succeed on correct data', async () => {
        
        const result = await logic.authenticateUser(email, password, domain)

        expect(result).toBeUndefined()

        token= logic.userCredentials 

        expect(typeof token).toBe('string')
        expect(token.length).toBeGreaterThan(0)

        const { sub } = jwt.verify(token, REACT_APP_JWT_SECRET_TEST)

        expect(sub).toBe(id)
    })

    afterAll(() => database.disconnect())

})
