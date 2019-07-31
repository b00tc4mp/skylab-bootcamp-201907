'use strict';

/**
 * Business Logic // part busines de la web app on hi tenim les funcions logiques de la part visual
 */

//variable regex que diu les coincidencies de email per ser valid
var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


 /*----  FORMULARIO DE REGISTER ----*/

 function register(name, surname, email, password) { //iniciem register amb els valors donats a presentation en el formulari
    var errors = '';

        /* farem cada cas de error posible, i el trim ens treura els espais, en cas d'error afagirem el string del error concatenan
    a variable error*/

    if (!name.trim()) {
        errors += 'Name is empty or blank.';
    }

    if (!surname.trim()) {
        if (errors) errors += '\n'; /* es equivalent a 'si error te algu a dins ficali un salt de linea perque fa 
        falta per el seguent parametre que aparegui abaix'amb els salts de linea*/

        errors += 'Surname is empty or blank.';
    }

    if (!email.trim()) {
        if (errors) errors += '\n';

        errors += 'E-mail is empty or blank.';
    } else if (!EMAIL_REGEX.test(email)) { //test del email, que es una excepcio de js perke testeji la variable regex
        if (errors) errors += '\n';

        errors += 'E-mail is not valid.';
    }

    if (!password.trim()) {
        if (errors) errors += '\n';

        errors += 'Password is empty or blank.\n';
    }

    if (errors)
        throw new Error(errors); /*para dexecutar el codi snse trencar amb throw i fa now error de errors amb les dades del 
        error eprque el catch el capturi*/
    else {

//en cas de que no hi hagi cap error referent a omplir casellas anteriors
//fem una comprovacio de si el email introduiit ja el tenim registrat a la base
//de dades, en cas positiu llançem error
        var user = users.find(function (user) {
            return user.email === email;
        });

        if (user) throw new Error('E-mail is already registered.');

        users.push({ //si todo va bien entonces mandamos datos a users
            name: name,
            surname: surname,
            email: email,
            password: password
        });
    }
}

/*----  FORMULARIO DE LOGIN ----*/

function login(email, password) {
    var errors = '';

    if (!email.trim()) {
        errors += 'E-mail is empty or blank.';
    } else if (!EMAIL_REGEX.test(email)) {
        errors += 'E-mail is not valid.';
    }

    if (!password.trim()) {
        if (errors) errors += '\n';

        errors += 'Password is empty or blank.\n';
    }

    if (errors) throw new Error(errors); /*para dexecutar el codi snse trencar amb throw i fa now error de errors amb les dades del 
    error eprque el catch el capturi*/

    var user = users.find(function (user) { /*apliquem un find que torna true si es dona el condicionant aplicant true al result,
        llavors segeix al final de la funcio i tornant a main pasem a canvi de panel*/
        return user.email === email && user.password === password;
    });

    if (!user) throw new Error('Wrong credentials.'); /*si users no es res del que busquem, que es en cas de que el condicionant 
    anterior no es dongui, dons tira error */
}