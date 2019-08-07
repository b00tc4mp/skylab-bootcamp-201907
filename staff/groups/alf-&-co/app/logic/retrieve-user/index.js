logic.retrieveUser = function(id, token){
    //validation id and token must be strings
    validate.string(id, 'id')
    validate.string(token,'token')

    //calls to the api with the id and token of the arguments and returns the data of this user
    return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', {'authorization':`bearer ${token}`}, undefined)
    .then(response=>{
        if(response.status==='KO') throw new Error(response.error)
        return response.data
    })
}