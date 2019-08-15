logic.retrieveUser = function (id, token, expression) {
    validate.string(id, 'id')
    validate.string(token, 'token')
    validate.function(expression, 'expression')

    call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get',
        { 'authorization': `bearer ${token}` },
        undefined,
        (error, response) => {
            if (error) expression(error)
            else if (response.status === 'KO') expression(new Error(response.error))
            else expression(undefined, response.data)
        }
    )
}