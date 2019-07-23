'use strict';

/**
 * BUSINESS LOGIC
 * DOCUMENTAR!!!!!!!!!
 * 
 * 
 * 
 */



// REGISTER + ITS ERRORS

function register(name, surname, email, password) {
    var errors = "";

    if (name.trim() === "") { // === (!name.trim()) ?
        errors += "Name is empty or blank.";
    }
    if (surname.trim() === "") { // === (!surname.trim()) ?
        if (errors) errors += '\n';
        errors += "Surname is empty or blank.";
    }
    if (email.trim() === "") { // === (!email.trim()) ?
        if (errors) errors += '\n';
        errors += "E-mail is empty or blank.";
    }
    if (password.trim() === "") { // === (!password.trim()) ?
        if (errors) errors += '\n';
        errors += "Password is empty or blank.";
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







var checkExisting = users.find(function (user) {
    return users.email !== email;
});

if 







// LOGIN + ITS ERRORS


function login(email, password) {
    var errors = "";

    if (!email.trim()) {
        if (errors)
        errors += "E-mail is empty or blank.";
    }
    if (!password.trim()) {
        if (errors) errors += '\n';
        errors += "Password is empty or blank.";
    }

    if (errors) throw new Error(errors);

    var user = users.find(function (user) {
        return user.email === email && user.password === password; // LO MISMO QUE UN FOR + IF PERO USANDO FIND Y EMITIENDO UN true/false directamente.
    });

    if (!user) throw new Error("Wrong login information.");
}