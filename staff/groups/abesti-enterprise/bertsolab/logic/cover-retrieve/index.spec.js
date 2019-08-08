{
    const { random } = Math

    describe('logic - retrieve album cover', () => {
        let user

        beforeEach(() => {
            user = {
                name: 'John-' + random(),
                surname: 'Rambo-' + random(),
                username: 'johnrambo-' + random() + '@mail.com',
                password: '123-' + random(),
                favorites: []
            }
        })

        it('should retrieve an Aerosmith album cover using mbid', () => {
            return logic.coverRetrieve('4e0f30f2-18e5-3bcc-822a-527beaea70cf')
            .then(cover => {
                expect(cover).toBe("http://coverartarchive.org/release/4e0f30f2-18e5-3bcc-822a-527beaea70cf/2610361342.jpg")
            })
            .catch(error => expect(error).toBeUndefined())
        })

        it('should retrieve a Portishead album cover using mbid', () => {
            return logic.coverRetrieve('76df3287-6cda-33eb-8e9a-044b5e15ffdd')
            .then(cover => {
                expect(cover).toBe("http://coverartarchive.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd/829521842.jpg")
            })
            .catch(error => expect(error).toBeUndefined())
        })
        
        it('should retrieve a Divididos album cover using mbid', () => {
            return logic.coverRetrieve('c47f9863-0216-446b-9f75-3253feb7882d')
            .then(cover => {
                expect(cover).toBe("http://coverartarchive.org/release/c47f9863-0216-446b-9f75-3253feb7882d/3906370047.jpg")
            })
            .catch(error => expect(error).toBeUndefined())
        })

        it('should get an  error on wrong mbid', () => {
            return logic.coverRetrieve('c47f9863-0216-446b-9f75-3253feb788')
            .then(cover => {
                expect(cover).toBeUndefined()
            })
            .catch(error => expect(error).toBeDefined())
        })

    })
}
