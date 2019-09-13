import logIn from '.'

xdescribe('logic - register user', () => {

    let name, surname, email, password, repassword
   
    beforeEach(() => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        repassword = password
    })

    it('should succeed on correct data', async () => {

        const response = await registerUser(name, surname, email, password, repassword)
            expect(response).toBeDefined()
            expect(response.message).toBe("User registered successfully")
    })

})