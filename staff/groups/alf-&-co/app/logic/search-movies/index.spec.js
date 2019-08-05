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


        fdescribe('logic - search movies - user with favorites', () => {
            let data
            let user

            beforeEach(() => {
                user = {
                    name: 'John-' + random(),
                    surname: 'Doe-' + random(),
                    username: 'johndoe-' + random() + '@mail.com',
                    password: '123-' + random(),
                    favorites: []
                }
            
                return call('https://skylabcoders.herokuapp.com/api/user', 'post',
                    { 'content-type': 'application/json' }, user)
                        .then(() => call('https://skylabcoders.herokuapp.com/api/auth', 'post',
                            { 'content-type': 'application/json' },
                            { username: user.username, password: user.password }))
                        .then(response => {
                            if (response.status === 'KO') throw new Error(response.error)
                            else data = response.data
                        })
                        .catch(error => error)
            })

            it('should succeed on matching criteria', () => {
            const query = 'train' // 20 results
            debugger

            logic.searchMovies(data.id, data.token, query)
                .then(movies => {
                    expect(movies).toBeDefined()
                    expect(movies instanceof Array).toBeTruthy()
                    expect(movies.length).toBe(20)

                    let favorites = 0

                    movies.forEach(movie => {
                        expect(movie.vote_count).toBeDefined()
                        expect(movie.id).toBeDefined()
                        expect(movie.video).toBeDefined()
                        expect(movie.title).toBeDefined()
                        expect(movie.popularity).toBeDefined()
                        expect(movie.poster_path).toBeDefined()
                        expect(movie.original_language).toBeDefined()
                        expect(movie.original_title).toBeDefined()
                        expect(movie.genre_ids).toBeDefined()
                        expect(movie.backdrop_path).toBeDefined()
                        expect(movie.adult).toBeDefined()
                        expect(movie.overview).toBeDefined()
                        expect(movie.release_date).toBeDefined()

                        movie.favorite && favorites++
                    })

                    expect(favorites).toBe(user.favorites.length)
                })
                .catch(error => expect(error).toBeDefined())
            })
        })

    })
}