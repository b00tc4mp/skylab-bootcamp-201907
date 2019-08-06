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

        it('should retrieve an album cover using mbid', () => {
            debugger
            return logic.coverRetrieve('4e0f30f2-18e5-3bcc-822a-527beaea70cf')
            .then(cover => {
                // expect(cover instanceof String).toBeTruthy()
                expect(cover).toBe("http://coverartarchive.org/release/4e0f30f2-18e5-3bcc-822a-527beaea70cf/2610361342.jpg")
            })
        })

        //TO DO MORE TEST CASES!!
    })
}

// 'Error: Expected 'http://coverartarchive.org/release/4e0f30f2-18e5-3bcc-822a-527beaea70cf/11545309408.jpg' to be 'http://coverartarchive.org/release/4e0f30f2-18e5-3bcc-822a-527beaea70cf/2610361342.jpg'.'
