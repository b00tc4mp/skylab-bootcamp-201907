/**Function that register new user in the API
 * @param {String} name  Name of user
 * @param {String} surname Surname of user
 * @param {String} username  Username of user
 * @param {String} password  Password of user
 * @param {String} repassword    Param that compare with Password for to know if its correctly write
 * @throws {Error} 'passwords do not match'   Error that is thrown when the password and repassword dont match
 * @throws {Error} 'KO'  Error that is thrown when an API error has ocurried
 * @return agree new user in API
 */
logic.registerUser =  (name, surname, username, password, repassword) => {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(username, 'username')
    validate.email(username, 'username')
    validate.string(password, 'password')
    validate.string(repassword, 'password repeat')
    if (password !== repassword) throw new Error('passwords do not match')
    return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, { name, surname, username, password, favorites: [] })
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)
        })
}