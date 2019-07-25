'use strict';

/**
* Business Logic
*/

var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Función registro
 * 
 * @param {*} name 
 * @param {*} surname 
 * @param {*} email 
 * @param {*} password 
 */
function userRegister(name, surname, email, password) {
    var errors = '';

    if (!name.trim()) {
        errors += 'Name is empty or blank';
    };

    if (!surname.trim()) {
        if (errors) errors += '\n';

        errors += 'Surname is empty or blank';
    };

    if (!email.trim()) {
        if (errors) errors += '\n';

        errors += 'E-mail is empty or blank';
    } else if (!EMAIL_REGEX.test(email)) {
        if (errors) errors += '\n';

        errors += 'E-mail is not valid';
    };

    if (!password.trim()) {
        if (errors) errors += '\n';

        errors += 'Password is empty or blank\n';
    };

    if (errors) {
        throw new Error(errors);
    } else {
        // Validation register if user no exist
        var user = users.find(function(element) {
            return element.email === email;
        });

        if (user) {
            throw new Error('Sorry! This Email belong to another user. Try again!');
        } else {
            users.push({
                name: name,
                surname: surname,
                email: email,
                password: password
            });
        };
    };
};

/**
 * Función user
 * 
 * @param {*} email 
 * @param {*} password 
 */
function userLogin(email, password) {
    var errors = '';
    // TODO: validation rules (REGEX) 101regex

    if (!email.trim()) {
        if (errors) errors += '\n';

        errors += 'E-mail is empty or blank.';
    };

    if (!password.trim()) {
        if (errors) errors += '\n';

        errors += 'Password is empty or blank.\n'
    }

    if (errors) {
        throw new Error(errors)
    } else {
        // Validation login if user is correct
        var user = users.find(function(element) {
            return element.email === email && element.password === password;
        });

        if (!user) {
            throw new Error('Wrong credentials. Try again!');
        };
    };
}

/**
 * Duck Search
 * 
 * @param {*} query 
 */
function searchApi(query) {
    var request = new XMLHttpRequest()
    
    request.open('get', 'http://duckling-api.herokuapp.com/api/search?q=' + query, false);
 
    request.send();

    return JSON.parse(request.responseText);;
};

// TODO: Sacar los elementos de presentación de la lógica. Hacer que imprima en la section product 