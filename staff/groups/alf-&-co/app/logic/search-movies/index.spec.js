{
    const { random } = Math

    /* Search movie specs:
        a) User should be able to search by keyword and get list of movies returned.
        b) If user is logged, search results will incorporate favorites information.
        c) Empty search will return non-filtered list of movies
        d) Non-valid query should display message saying no results for that query
    */

    describe('logic - search movies', () => {
    
        it('should succeed on correct data', () => {
            return logic.searchMovies(undefined, undefined, 'train')
               .then(response => {
                   expect(response).toBeDefined()
                   expect(response instanceof Array).toBeTruthy()
                   expect(response[0].id).toBeDefined()
               })
               .catch(error => error)
            })

        it('should fail on empty query', () => {
            return logic.searchMovies(undefined, undefined, '')
                .then(response => response)
                .catch(error =>  {
                    expect(error).toBeDefined()
                    expect(error.message).toBe('Search keyword must be provided.')
                })
                   
            })
        
         it('should fail on non-valid query', () => {
            const query = 'asdafsafsdf'
            return logic.searchMovies(undefined, undefined, query)
                .then(response => response)
                .catch(error =>  {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`There are no results for query: ${query}`)
                })
                   
            })


        describe('logic - search movies - user with favorites', () => {
            let user

            beforeEach(() => {
            
                user = {
                    name: 'John-' + random(),
                    surname: 'Doe-' + random(),
                    username: 'johndoe-' + random() + '@mail.com',
                    password: '123-' + random(),
                    favorites: []
                }
            
                return call(url, 'post', { 'content-type': 'application/json' }, user)
                    .then(response => {
                        if (response.status === 'KO') throw new Error(response.error)
                    })
            })

        })
    })
}