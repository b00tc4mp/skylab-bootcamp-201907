'use strict';

/**
 * Presentation
 */

var panels = document.getElementsByClassName('panel');

// initial panel

var initialContainer = panels[0];

var initialPanel = new Panel(initialContainer);

var registerLink = initialPanel.container.children[0];
var loginLink = initialPanel.container.children[1];

registerLink.addEventListener('click', function (event) {
    event.preventDefault();

    initialPanel.hide();
    registerPanel.show();
});

loginLink.addEventListener('click', function (event) {
    event.preventDefault();

    initialPanel.hide();
    loginPanel.show();
});

// register panel

var registerContainer = panels[1];

var registerPanel = new Panel(registerContainer);

var registerBackLink = registerPanel.container.children[2];

registerBackLink.addEventListener('click', function (event) {
    event.preventDefault();

    registerPanel.hide();
    initialPanel.show();
});

var registerForm = registerPanel.container.children[0];

registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var name = event.target.name.value;
    var surname = event.target.surname.value;
    var email = event.target.email.value;
    var password = event.target.password.value;

    try {
        register(name, surname, email, password);

        registerPanel.hide();
        registerSuccessPanel.show();
    } catch (error) {
        var registerFeedback = registerPanel.container.children[1];

        registerFeedback.innerText = error.message;
    }
});

// register success panel

var registerSuccessContainer = panels[2];

var registerSuccessPanel = new Panel(registerSuccessContainer);

var registerSuccessLoginLink = registerSuccessPanel.container.children[0];

registerSuccessLoginLink.addEventListener('click', function (event) {
    event.preventDefault();

    registerSuccessPanel.hide();
    loginPanel.show();
});

// login panel

var loginContainer = panels[3];

var loginPanel = new Panel(loginContainer);

var loginBackLink = loginPanel.container.children[2];

loginBackLink.addEventListener('click', function (event) {
    event.preventDefault();

    loginPanel.hide();

    initialPanel.show();
});

var loginForm = loginPanel.container.children[0];

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var email = event.target.email.value;
    var password = event.target.password.value;

    try {
        login(email, password);

        loginPanel.hide();
        welcomePanel.show();
    } catch(error) {
        var loginFeedback = loginPanel.container.children[1];

        loginFeedback.innerText = error.message;
    }
});

var welcomeContainer = panels[4];

var welcomePanel = new Panel(welcomeContainer);

