'use strict'
/**
 * All logic here
 */

function register(name, surname, email, password) {
    var errors = ''

    var found = users.find(function (element) {
        return element.email === email
    });

    if (!name.trim()) {
        if (errors) errors += '\n'
        errors += 'Name is empty or blank.'
    }

    if (!surname.trim()) {
        if (errors) errors += '\n';
        errors += 'Surname is empty or blank.';
    }

    if (!email.trim()) {
        if (errors) errors += '\n'
        errors += 'E-mail is empty or blank.'
    } else if (email.length < 7) {
        if (errors) errors = '\n'
        errors = 'e-mail to short, minimum 7 charachters of length'
    } else if (validateEmail(email) !== true) {
        if (errors) errors = '\n'
        errors = 'Your e-mail format is not correct'
    } else if (found !== undefined) {
        errors = 'email already exists'
    }

    if (!password.trim()) {
        if (errors) errors += '\n'
        errors += 'Password is empty or blank';
    } else if (password.length < 8 || password.length >= 10) {
        errors = 'Password must be between 8 and 10 characters'
    }



    if (errors) {
        throw new Error(errors)
    } else {
        users.push({
            name: name,
            surname: surname,
            email: email,
            password: password
        });
    }


    function validateEmail(email) {
        return /\S+@\S+\.\S+/.test(email)
    }
}

function resetAlerts() {
    var alerts = document.getElementsByClassName('alert')
    registerPanel.container.children[0].reset();
    loginPanel.container.children[0].reset();
    for (var i = 0; i < alerts.length; i++) {
        alerts[i].innerText = ''
    };
};


function login(email, password) {
    var errors = ''

    if (!email.trim()) {
        if (errors) errors += '\n'
        errors += 'E-mail is empty or blank.'
    }

    if (!password.trim()) {
        if (errors) errors += '\n'
        errors += 'Password is empty or blank'
    }

    if (errors) throw new Error(errors)

    var user = users.find(function (user) {
        return user.email === email && user.password === password;
    });

    if (!user) throw new Error('Wrong credentials')
}