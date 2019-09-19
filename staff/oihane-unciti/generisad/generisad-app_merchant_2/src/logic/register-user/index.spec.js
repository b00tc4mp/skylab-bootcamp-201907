import registerUser from '.'
const { random } = Math
import { database, models } from 'generisad-data'
const { User, Advertisement, Merchant } = models
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST

describe('logic - register user', () => {
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

    })

    it('should succeed on correct data', async () => {
        const response = await registerUser(name, surname, email, password, domain)

        expect(response).toBeUndefined()
    })
})