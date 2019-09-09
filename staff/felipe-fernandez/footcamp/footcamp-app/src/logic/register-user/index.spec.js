import registerUser from '.'

const { random } = Math

describe('logic - register user', () => {
    let name, surname, email, password
    
    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
    })

    it('should succeed on correct data', async () => {
        const response = await registerUser(name, surname, email, password)
        
        expect(response).toBeUndefined()
    })

    // /* Name */
    // it('should fail on empty name', () => 
    //     expect(() => 
    //            logic.user.register('', surname, email, password)
    // ).to.throw('name is empty or blank')
    // )

    //  it('should fail on undefined name', () => 
    //     expect(() => 
    //            logic.user.register(undefined, surname, email, password)
    // ).to.throw(`name with value undefined is not a string`)
    // )

    //  it('should fail on wrong data type for name', () => 
    //     expect(() => 
    //            logic.user.register(123, surname, email, password)
    // ).to.throw(`name with value 123 is not a string`)
    // )

    // /* Surname */
    // it('should fail on empty surname', () => 
    //     expect(() => 
    //            logic.user.register(name, '', email, password)
    // ).to.throw('surname is empty or blank')
    // )

    //  it('should fail on undefined surname', () => 
    //     expect(() => 
    //            logic.user.register(name, undefined, email, password)
    // ).to.throw(`surname with value undefined is not a string`)
    // )

    //  it('should fail on wrong data type for surname', () => 
    //     expect(() => 
    //            logic.user.register(name, 123, email, password)
    // ).to.throw(`surname with value 123 is not a string`)
    // )


    // /* Email */
    // it('should fail on empty email', () => 
    //     expect(() => 
    //            logic.user.register(name, surname, '', password)
    // ).to.throw('email is empty or blank')
    // )

    //  it('should fail on undefined surname', () => 
    //     expect(() => 
    //            logic.user.register(name, surname, undefined, password)
    // ).to.throw(`email with value undefined is not a string`)
    // )

    //  it('should fail on wrong data type for email', () => 
    //     expect(() => 
    //            logic.user.register(name, surname, 123, password)
    // ).to.throw(`email with value 123 is not a string`)
    // )

    //  it('should fail on wrong email format', () => 
    //     expect(() => 
    //            logic.user.register(name, surname, 'a@a', password)
    // ).to.throw(`email with value a@a is not a valid e-mail`)
    // )

    // /* Password */
    // it('should fail on empty password', () => 
    //     expect(() => 
    //            logic.user.register(name, surname, email, '')
    // ).to.throw('password is empty or blank')
    // )

    //  it('should fail on undefined password', () => 
    //     expect(() => 
    //            logic.user.register(name, surname, email, undefined)
    // ).to.throw(`password with value undefined is not a string`)
    // )

    //  it('should fail on wrong data type for password', () => 
    //     expect(() => 
    //            logic.user.register(name, surname, email, 123)
    // ).to.throw(`password with value 123 is not a string`)
    // )

   
})