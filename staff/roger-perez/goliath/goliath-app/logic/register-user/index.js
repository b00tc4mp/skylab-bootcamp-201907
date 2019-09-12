logic.registerUser = function (name, surname,instrument,description,email, password, repassword,drumkits,admin) {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(instrument, 'instrument')
    validate.string(description, 'description')
    validate.email(email,'email')
    validate.string(password, 'password')
    validate.string(repassword, 'password repeat')


    if (password !== repassword) throw new Error('passwords do not match')

    return call('http://localhost:8080/api/users', 'post', { 'content-type': 'application/json' }, { name, surname, instrument,description,email, password,drumkits:[],admin:false})
        .then(response => {
            // if (response.status !== 200 || response.status !== 201 ) {
            //     throw new Error(response.error)
            // }
            console.log('response :', response);
        })
        .catch( err => {
            console.log('err on register:', JSON.stringify(err));
            throw new Error(err)
           
        })
}
