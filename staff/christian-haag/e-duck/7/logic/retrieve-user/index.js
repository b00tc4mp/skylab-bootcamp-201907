logic.retrieveUser = function (id, token, expression) {
    validate.string(id, 'id')
    validate.string(token, 'token')
    validate.function(expression, 'expression')

    return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get',
        { 'authorization': `bearer ${token}` },
        undefined)
        .then(response => {
            if (response === 'KO') throw new Error(response.error)
            else return response.data
        })

}