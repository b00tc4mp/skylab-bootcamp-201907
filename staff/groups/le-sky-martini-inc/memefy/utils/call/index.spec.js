describe('call', () => {
    describe('post', () => {
        it('should succeed on coherent data', () => {
            return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, {
                username: `pepito-${Math.random()}`,
                password: 'grillo'
            })
                .then(res => expect(res).toBeDefined())
                .catch(error => expect(error).toBeUndefined())
        })
    })

    describe('get', () => {
        it('should succeed on coherent data', () => {
            return call('https://api.giphy.com/v1/gifs/search?api_key=yXEKD5c78ISwI8WSOKyTndpHZH9XpqQW&q=white&limit=25&offset=0&rating=G&lang=en', 'get', undefined, undefined)
                .then(res => res.data)
                .then(res => expect(res).toBeDefined())
                .catch(error => expect(error).toBeUndefined())
        })
    })

    describe('put', () => {
        it('should succeed on coherent data', () => {
            return call('https://reqres.in/api/users/2', 'put', undefined, {
                "name": "Janet",
                "last_name": "Weaver"
            })
                .then(res => expect(res).toBeDefined())
                .catch(error => expect(error).toBeUndefined())
        })
    })

    // TODO test delete and patch
})