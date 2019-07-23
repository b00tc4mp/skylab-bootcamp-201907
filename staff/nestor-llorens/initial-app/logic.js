'use strict'

// logic

function register(name, surname, email, password) {
    var errors = '';

    if (!name.trim()) {
        errors += 'Name is empty or blank.';
    }

    if(!surname.trim()) {
        if(errors) errors += '\n';
        errors += 'Surname is empty or blank';
    }

    if(!email.trim()) {
        if(errors) errors += '\n';
        errors += 'email is empty or blank';
        
    }

    if(!password.trim()) {
        if(errors) errors += '\n';
        errors += 'password is empty or blank.\n';
    }

    if (errors) throw new Error(errors);
    else {
        if (findEmail(email) === false) {
            users.push({
                name: name,
                surname: surname,
                email: email,
                password: password
            });
        }
        else throw new Error('email is already in use');


    }
}
function findEmail(email) {
    for (var i=0; i< users.length; i++) {
        if (users[i].email === email) return true;
    }
    return false;
}


function clear() {
    for (var i = 0; i< inputs.length; i++) inputs[i].value = '';
}