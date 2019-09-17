import logic from '../../'

describe('logic - is user logged in', () => {

    beforeEach(async () => {
        logic.__userCredentials__ = { id: '123', token: '123'}
    })

    it('should succeed on correct data', async () => {
        const loggedIn = logic.isUserLoggedIn()
        
        expect(typeof loggedIn).toBe('boolean')
        expect(loggedIn).toBeTruthy()
    })
    
})