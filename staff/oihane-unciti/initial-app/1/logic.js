'use strict';

/**
 * Business Logic
 */

function register(name, surname, email, password) {
    var errors = '';
debugger;
    if (!name.trim()) {
        errors += 'Name is empty or blank.';
    }

    if (!surname.trim()) {
        if (errors) errors += '\n';

        errors += 'Surname is empty or blank.';
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
    else
        users.push({
            name: name,
            surname: surname,
            email: email,
            password: password
        });
}


function login(email, password) {
    var errors = '';

    if (!email.trim()) {
        if (errors) errors += '\n';

        errors += 'E-mail is empty or blank.';
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