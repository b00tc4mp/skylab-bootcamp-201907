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

// register panel

var registerPanel = new RegisterPanel(panels[1]);

registerPanel.onNavigateBack(function (event) {
    event.preventDefault();

    registerPanel.hide();
    initialPanel.show();
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
    } catch (error) {
        var registerFeedback = registerPanel.container.children[1];

        registerFeedback.innerText = error.message;
    }
});

// register success panel

var registerSuccessPanel = new SuccessRegisterPanel(panels[2]);

registerSuccessPanel.onNavigateLogin(function (event) {
    event.preventDefault();

    registerSuccessPanel.hide();
    loginPanel.show();
});

 
// login panel


var loginPanel = new LoginPanel(panels[3]);


loginPanel.backToIni(function (event) {
    event.preventDefault();
    loginPanel.hide();
    initialPanel.show();
});

loginPanel.onNavigateToWelcome(function (event) {
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


//welcome Panel

var welcomePanel = new WelcomePanel(panels[4]);







