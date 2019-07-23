/**
 * var users= where keep all the users registered.
 * var panel= all html panels.
 */

var users = [];
var actualUser = [];
var panels = document.getElementsByClassName('panel');
var errorText = document.querySelector('.errorText');
var registerFeedback = resgisterPanel.children[1]

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}



var initialPanel = panels[0]; //-------------------------Initial Panel---------------------------[0]of panels 
//option register
var registerLink = initialPanel.children[0]; //a>Register
var loginLink = initialPanel.children[1]; //a>Login

registerLink.addEventListener('click', function (event) { //child[1] of initialPanel 
    event.preventDefault();

    initialPanel.classList.remove('panel--show');
    initialPanel.classList.add('panel--hide');

    registerPanel.classList.remove('panel--hide');
    registerPanel.classList.add('panel--show');

});
//option login

loginLink.addEventListener('click', function (event) { //child[1] of initialPanel 
    event.preventDefault();

    initialPanel.classList.remove('panel--show');
    initialPanel.classList.add('panel--hide');

    loginPanel.classList.remove('panel--hide');
    loginPanel.classList.add('panel--show');

});

var registerPanel = panels[1]; //-------------------------Register Panel----------------------------[1]of panels 

// form register
var registerForm = registerPanel.children[0];

registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var name = event.target.name.value;
    var surname = event.target.surname.value;
    var email = event.target.email.value;
    var password = event.target.password.value;

    if (!name.trim().length) registerFeedback.innerHTML = 'wrong name';
    else {
        users.push({
            name: name,
            surname: surname,
            email: email,
            password: password
        });

        registerPanel.classList.remove('panel--show');
        registerPanel.classList.add('panel--hide');

        registerSuccessPanel.classList.remove('panel--hide');
        registerSuccessPanel.classList.add('panel--show');
    }
});

// option back return
var registerBackLink = registerPanel.children[2];

registerBackLink.addEventListener('click', function (event) {
    event.preventDefault();

    registerPanel.classList.remove('panel--show');
    registerPanel.classList.add('panel--hide');

    initialPanel.classList.remove('panel--hide');
    initialPanel.classList.add('panel--show');

});

var registerSuccessPanel = panels[2]; //-------------------------Success Panel----------------------------[2]of panels 

//option back return
var loginBackLink = registerSuccessPanel.children[0];

loginBackLink.addEventListener('click', function (event) {
    event.preventDefault();

    registerSuccessPanel.classList.remove('panel--show');
    registerSuccessPanel.classList.add('panel--hide');

    loginPanel.classList.remove('panel--hide');
    loginPanel.classList.add('panel--show');


});
var loginPanel = panels[3]; //-------------------------Login Panel----------------------------[3]of panels 
//form login
var loginForm = loginPanel.children[0];
var loginSuccessPanel = panels[4];

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    email = event.target.email.value

    var e = validateEmail(email);

    if (e === true) {
        email = event.target.email.value;
    } else {
        errorText.innerHTML = 'Wrong credencials!';
        email = ''
    }


    password = event.target.password.value;

    for (prop in users) {
        if (users[prop].email === email && users[prop].password === password) {
            actualUser.push(users[prop]);

            var log = loginSuccessPanel.children[0].innerHTML = 'Welcome ' + users[prop].name;
            loginPanel.classList.remove('panel--show');
            loginPanel.classList.add('panel--hide');
            loginSuccessPanel.classList.remove('panel--hide');
            loginSuccessPanel.classList.add('panel--show');

        } else if (users[prop].email !== email || users[prop].password !== password) {

            errorText.innerHTML = 'Wrong credencials!';

        } else if (users[prop].email !== email && users[prop].password !== password) {

            errorText.innerHTML = 'Please, register to continue.';
        } else {
            errorText.innerHTML = 'Please, register to continue.';
        }
    }
});
