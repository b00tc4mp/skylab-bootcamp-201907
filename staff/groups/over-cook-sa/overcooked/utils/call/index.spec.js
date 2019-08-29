describe('call', () => {
    describe('post', () => {
        it('should succeed on coherent data', () => {
            return call('https://skylabcoders.herokuapp.com/api/user', 'post', {
                    'content-type': 'application/json'
                }, {
                    username: `pepito-${Math.random()}`,
                    password: 'grillo'
                })
                .then(res => expect(res).toBeDefined())
                .catch(error => expect(error).toBeUndefined())
        })
    })

    describe('get', () => {
        it('should succeed on coherent data', () => {
            return call('https://duckling-api.herokuapp.com/api/search?q=green', 'get', undefined, undefined)
                .then(res => expect(res).toBeDefined())
                .catch(error => expect(error).toBeUndefined())
        })
    })

    describe('put', () => {
        it('should succeed on coherent data', () => {
            return call('https://reqres.in/api/users/2', 'put', undefined, {
                    "name": "morpheus",
                    "job": "zion resident"
                })
                .then(res => expect(res).toBeDefined())
                .catch(error => expect(error).toBeUndefined())
        })
    })

    // TODO test delete and patch
})