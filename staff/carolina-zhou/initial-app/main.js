'use strict';

/**
 * Presentation
 */

var panels = document.getElementsByClassName('panel');

// initial panel
var initialPanel = new InitialPanel(panels[0]);

initialPanel.onNavigateToRegister(function (event) {
    event.preventDefault();

    initialPanel.hide();
    registerPanel.show();
});

initialPanel.onNavigateToLogin(function (event) {
    event.preventDefault();

    initialPanel.hide();
    loginPanel.show();
});

// register process panel
var registerPanel = new RegisterPanel(panels[1]);

registerPanel.onNavigateBack(function (event) {
    event.preventDefault();

    registerPanel.hide();
    initialPanel.show();
    errorPanel.hide();
});

registerPanel.onRegisterSubmit(function (event) {
    event.preventDefault();

    var name = event.target.name.value;
    var surname = event.target.surname.value;
    var email = event.target.email.value;
    var password = event.target.password.value;

    try {
        register(name, surname, email, password);

        registerPanel.hide();
        registerSuccessPanel.show();
        errorPanel.hide();
    } catch (error) {
        errorPanel.show();
        document.getElementsByClassName("error__message")[0].innerHTML = error.message; 
    }
});

// register confirmation panel
var registerSuccessPanel = new RegisterSuccessPanel(panels[2]);

registerSuccessPanel.firstLog(function (event) {
    event.preventDefault();

    var firstLog = document.getElementById("finalPass").value;
    var lastUser = users[users.length -1];

    if (lastUser.password === firstLog) {
        registerSuccessPanel.hide();
        homePanel.show();
        errorPanel.hide();
    } else {
        errorPanel.show();
        document.getElementsByClassName("error__message")[0].innerHTML = "Wrong password. Try again.";
    }
});

// login panel
var loginPanel = new LoginPanel(panels[3]);

loginPanel.onNavigateBack(function (event) {
    event.preventDefault();

    loginPanel.hide();
    initialPanel.show()
    errorPanel.hide();
});

loginPanel.onLoginSubmit(function (event) {
    event.preventDefault();

    var email = document.getElementById("userEmail").value;
    var password = document.getElementById("userPassword").value;

    try {
        login(email, password);

        loginPanel.hide();
        homePanel.show();
        errorPanel.hide();
    } catch(error) {
        errorPanel.show();
        document.getElementsByClassName("error__message")[0].innerHTML = error.message;
    }
});

// home panel
var homePanel = new HomePanel(panels[4]);

homePanel.logOut(function (event) {
    event.preventDefault();

    homePanel.hide();
    initialPanel.show();
});

// error panel
var errorPanel =  new ErrorPanel(panels[5]);