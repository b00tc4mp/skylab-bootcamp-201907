logic.retrieveUser = function (id, token) {
    if(id.trim() === '') throw new Error('id is empty or blank')
    if(token.trim() === '') throw new Error('id is empty or blank')
    if(typeof id !== 'string') throw new Error('id is not string')
    if(typeof token !== 'string') throw new Error('id is not string')

    return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined, 'skylab')
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)

            return response.data
        })
}