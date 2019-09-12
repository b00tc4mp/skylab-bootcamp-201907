import logic from '..'

describe('logic - is user logged in', () => {
    beforeEach(async () => {
        logic.__userCredentials__ = '123'
    })

    it('should succeed on correct data', async () => {
        logic.logUserOut()
        
        expect(logic.__userCredentials__).toBeUndefined()
    })
})