'use strict';

var users = new Curray();
var panels = document.getElementsByClassName('panel');

var errorPanel = panels[5];
// initial panel
var initialPanel = panels[0];
var registerLink = document.getElementsByClassName('intro__register')[0];
var loginLink = document.getElementsByClassName('intro__login')[0];

registerLink.addEventListener('click', function(event) {
    event.preventDefault();

    initialPanel.classList.remove('panel--show');
    initialPanel.classList.add('panel--hide');

    registerPanel.classList.remove('panel--hide');
    registerPanel.classList.add('panel--show');
});

loginLink.addEventListener('click', function(event) {
    event.preventDefault();

    initialPanel.classList.remove('panel--show');
    initialPanel.classList.add('panel--hide');

    loginPanel.classList.remove('panel--hide');
    loginPanel.classList.add('panel--show');
});

// register process panel
var registerPanel = panels[1];
var registerBackLink = document.getElementsByClassName('register__back')[0];

registerBackLink.addEventListener('click', function(event) {
    event.preventDefault();

    registerPanel.classList.remove('panel--show');
    registerPanel.classList.add('panel--hide');
    
    initialPanel.classList.remove('panel--hide');
    initialPanel.classList.add('panel--show');
});

var registerForm = registerPanel.children[0];

registerForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var name = event.target.name.value;
    var surname = event.target.surname.value;
    var email = event.target.email.value;
    var password = event.target.password.value; 
    var user = users.find(function (user) {
        return user.email !== email;
    });

    if (user === true || users.length === 0) {

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

    } else if (user.email === email) {

        errorPanel.classList.remove('panel--hide');
        errorPanel.classList.add('panel--show');

        document.getElementsByClassName("error__message")[0].innerHTML = "There is already an account with the provided email address";
    }
});

// register confirmation panel
var registerSuccessPanel = panels[2];
var confirmationForm = registerSuccessPanel.children[0];

confirmationForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var firstLog = document.getElementById("finalPass").value;
    var lastUser = users[users.length -1];

    if (lastUser.password === firstLog) {
        registerSuccessPanel.classList.remove('panel--show');
        registerSuccessPanel.classList.add('panel--hide');
        
        homePanel.classList.remove('panel--hide');
        homePanel.classList.add('panel--show');

        errorPanel.classList.remove('panel--show');
        errorPanel.classList.add('panel--hide');
    } else {
        errorPanel.classList.remove('panel--hide');
        errorPanel.classList.add('panel--show');

        document.getElementsByClassName("error__message")[0].innerHTML = "Wrong password. Try again.";
    }
});

// login panel
var loginPanel = panels[3];
var loginForm = loginPanel.children[0];
var loginBackLink = document.getElementsByClassName('login__back')[0];

loginBackLink.addEventListener('click', function(event) {
    event.preventDefault();

    loginPanel.classList.remove('panel--show');
    loginPanel.classList.add('panel--hide');
    
    initialPanel.classList.remove('panel--hide');
    initialPanel.classList.add('panel--show');

    errorPanel.classList.remove('panel--show');
    errorPanel.classList.add('panel--hide');
});

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById("userEmail").value;
    var password = document.getElementById("userPassword").value;
    var user = users.find(function (user) {
        return user.email === email && user.password === password;
    });

    if (user) {
        loginPanel.classList.remove('panel--show');
        loginPanel.classList.add('panel--hide');
        
        homePanel.classList.remove('panel--hide');
        homePanel.classList.add('panel--show');
    } else {
        errorPanel.classList.remove('panel--hide');
        errorPanel.classList.add('panel--show');

        document.getElementsByClassName("error__message")[0].innerHTML = "Wrong credentials!";
    }
});

// home panel
var homePanel = panels[4];
