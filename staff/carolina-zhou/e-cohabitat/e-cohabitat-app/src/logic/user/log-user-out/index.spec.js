import logic from '../../'

describe('logic - is user logged out', () => {

    beforeEach(async () => {
        logic.__userCredentials__ = { id: '123', token: '123'}
    })

    it('should succeed on correct data', async () => {
        logic.logUserOut()
        
        expect(logic.__userCredentials__id).toBeUndefined()
        expect(logic.__userCredentials__token).toBeUndefined()
    })

})
