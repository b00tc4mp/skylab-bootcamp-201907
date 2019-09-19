import authenticateUser from '.'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

const {random} = Math

describe('logic-authenticate user', ()=>{
    let name, surname, email, password, email2, password2
    beforeEach(()=>{
        
        name= `name-${random()}`
        surname= `surname-${random()}`
        email= `email-${random()}@mail.com`
        password= `password-${random()}`
        
        return (async () => {
            const response = await fetch(`${REACT_APP_API_URL}/users`, {
                method: 'post',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ name, surname, email, password })
            })
            // const {email: email2, password: password2} = response
            debugger
            await fetch(`${REACT_APP_API_URL}/auth`, {
                method: 'post', 
                headers: {'content-type':'application/json'},
                body: JSON.stringify ({email, password})
            })
    })()
})
    it('should succeed on correct data', async () => {
        
        const user = await authenticateUser(email, password)
        debugger
        expect(user).toBeDefined()
        const id = user.id
        const token = user.token
        expect(id).toBeDefined()
        expect(token).toBeDefined()
    })
    it('should fail on incorrect data', async ()=>{
        let password = "fail"
        try {
            await authenticateUser(email, password)
        } catch({message}) {
         expect(message).toBe(`Wrong credentials.`)
        }
    })
})
