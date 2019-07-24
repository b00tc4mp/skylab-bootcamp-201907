'use strict';

/**
 * Business Logic
 */

var regexmail = /[a-z0-9!#$%&'*+\/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9][a-z0-9-]*[a-z0-9]/;


function register(name, surname, email, password) {
    var errors = '';
     
    
    if (!name.trim()) {
        errors += 'Name is empty or blank';
   
    } 

    if (!surname.trim()) {
        if (errors) errors += '\n';

        errors += 'Surname is empty or blank';
    }

    if (!email.trim()) {
        
        if (errors) errors += '\n';

        errors += 'E-mail is empty or blank';   

    } else if (!regexmail.test(email)){
        
        errors = 'Fill the email form correctly'

    } 

    if (!password.trim()) {
        if (errors) errors += '\n';

        errors += 'Password is empty or blank.\n';
    }

    if (errors)
        throw new Error(errors);
   
    else

        var emailexist = users.find(function(mail) {
            return mail.email === email;
        });

        if (emailexist){
        throw new Error ("This email already exists");
        }

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
    } else if (!regexmail.test(email)){
        
        errors = 'Fill the email form correctly'

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