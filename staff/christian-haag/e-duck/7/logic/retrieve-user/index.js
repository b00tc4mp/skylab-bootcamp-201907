logic.retrieveUser = function (id, token) {
    validate.string(id, 'id')
    validate.string(token, 'token')

    return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get',
        { 'authorization': `bearer ${token}` },
        undefined)
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)
            return response.data
        })

}