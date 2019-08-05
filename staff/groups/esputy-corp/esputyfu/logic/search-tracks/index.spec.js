/**
 * 
 * Controlar errores sincronos
 * controlar si responde algo
 * controlar que devuelva el número de trakcs que queremos
 * 
 */

 describe('search tracks', () => {
     describe('when the user not logged', () => {
        it('should retrieve tracks', () => 
            logic.searchTracks(undefined, undefined, 'wonderwall')
                .then(tracks => {
                    expect(tracks).toBeDefined()
                    expect(tracks.length).toBe(20)
                })
        )

        it('should return error: query with value is not a string', () => 
            expect( () =>
                logic.searchTracks(undefined, undefined, 24324532)
            ).toThrowError('query with value 24324532 is not a string')
        )
     })
 })


