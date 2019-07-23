'use strict';

/**
 * Business Logic
 */

var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


function register(name, surname, email, password) {
    var errors = '';

    if (!name.trim()) {
        errors += 'Name is empty or blank.';
    }

    if (!surname.trim()) {
        if (errors) errors += '\n';

        errors += 'Surname is empty or blank.';
    } else if(!EMAIL_REGEX.test(email)){
        if(errors) errors += "\n";
        errors += 'E-mail is not valid.';
    }

    if (!email.trim()) {
        if (errors) errors += '\n';

        errors += 'E-mail is empty or blank.';
    }

    if (!password.trim()) {
        if (errors) errors += '\n';

        errors += 'Password is empty or blank.\n';
    }

    if (errors)
        throw new Error(errors);
    else{
        /** cuando el usuario existe */
        var user=users.find(function(user){
            return user.email===email
        });
        if(user) throw new Error("E-mail is alrady registered.");
        users.push({
            name: name,
            surname: surname,
            email: email,
            password: password
        });

    }
       
}

function login(email, password) {
    var errors = '';

    if (!email.trim()) {
        if (errors) errors += '\n';

        errors += 'E-mail is empty or blank.';
    }else if (!EMAIL_REGEX.test(email)) {
        errors += 'E-mail is not valid.';
    }

    if (!password.trim()) {
        if (errors) errors += '\n';

        errors += 'Password is empty or blank.\n';
    }

    if (errors) throw new Error(errors);

    var user = users.find(function (user) {
        return user.email === email && user.password === password;
    });

    if (!user) throw new Error('Wrong credentials.');
}


function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
 }