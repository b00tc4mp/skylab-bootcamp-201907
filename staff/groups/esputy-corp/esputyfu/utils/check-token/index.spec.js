{
    describe('utils - check token', () => {
        const _token = 'BQDydo1tJ22XoAOc69le-uaJLYHs3cy2Vk9E80X_2x3Mg_n7m0ML35CharX0GfdwXFD-r4XZoV2p6Zp5Xfs'
        const invToken = 'jkjajvdbhbief bbui'
        
        it('should throw error on expired token', () => 
                checkToken(_token)
                .then(res => res.toBeUndefined())
                .catch(error => expect(error).toBeDefined())
        )
    })
}