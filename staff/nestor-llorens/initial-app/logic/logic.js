const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function login(email, pass) {
    let errors = '';

    if (!email.trim()) {
        errors += 'E-mail is empty or blank.';
    } else if (!EMAIL_REGEX.test(email)) {
        errors += 'E-mail is not valid.';
    }

    if (!pass.trim()) {
        if (errors) errors += '\n';

        errors += 'Password is empty or blank.\n';
    }

    if (errors) throw new Error(errors);

    const user = users.find(function (user) {
        return user.email === email && user.pass === pass;
    });

    if (!user) throw new Error('Wrong credentials.');
}

function register(name, lastName, email, pass) {
    let errors = '';

    if (!name.trim()) {
        errors += 'Name is empty or blank.';
    }

    if (!lastName.trim()) {
        if (errors) errors += '\n';

        errors += 'Last name is empty or blank.';
    }

    if (!email.trim()) {
        if (errors) errors += '\n';

        errors += 'E-mail is empty or blank.';
    } else if (!EMAIL_REGEX.test(email)) {
        if (errors) errors += '\n';

        errors += 'E-mail is not valid.';
    }

    if (!pass.trim()) {
        if (errors) errors += '\n';

        errors += 'Password is empty or blank.\n';
    }

    if (errors)
        throw new Error(errors);
    else {
        var user = users.find(function (user) {
            return user.email === email;
        });

        if (user) throw new Error('E-mail is already registered.');

        users.push({
            name: name,
            lastName: lastName,
            email: email,
            pass: pass
        });
    }
}
