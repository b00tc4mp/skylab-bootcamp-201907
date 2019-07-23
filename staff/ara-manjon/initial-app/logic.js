'use stric'

/**
 * Bussiness Logic
 */

function register(name, surname, email, password) {
    var errors = '';

    if (!name.trim().length) {
        errors += 'Name is empty or blank.';
    }

    if (!surname.trim().length) {
        if (errors) errors += '\n';
        errors += 'Surname is empty or blank.';
    }

    if (!email.trim().length) {
        if (errors) errors += '\n';
        errors += 'E-amil is empty or blank.';
    }

    if (!password.trim().length) {
        if (errors) errors += '\n';
        errors += 'Password is empty or blank.'

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

    if (!email.trim().length) {
        if (errors) errors += '\n';

        errors += 'E-mail is empty or blank.';
    }
    if (!password.trim().length) {
        if (errors) errors += '\n';
        errors += 'Password is empty or blank.'
    }
    if (errors) throw new Error(errors);
    var user = users.find(function (user) {
        return user.email === email && user.password ===
            password;
    });
    if (!user) throw new Error('Wrong credentials.');
}