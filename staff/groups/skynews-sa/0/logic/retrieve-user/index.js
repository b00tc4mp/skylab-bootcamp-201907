/**Function that retrieve user dates
 * @param {number} id   Credential id for access the API
 * @param {number} token    Credential token for access the API
 * @throws {Error}  Error of user credentials
 * @return dates user of API
 */
logic.retrieveUser =  (id, token) => {
  validate.string(id, 'id')
  validate.string(token, 'token')

  return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', {'authorization' : `bearer ${token}`}, undefined)
    .then(response => {
        if(response.status === 'KO') throw new Error(response.error)

        return response.data
    })
}

