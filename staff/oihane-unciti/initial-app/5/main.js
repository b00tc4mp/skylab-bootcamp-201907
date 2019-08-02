'use strict';

/**
 * Presentation
 */

var panels = document.getElementsByClassName('panel');

// initial panel

var initialPanel = new InitialPanel(panels[0]);

initialPanel.onNavigateToRegister(function () {
    initialPanel.hide();
    registerPanel.show();
});

initialPanel.onNavigateToLogin(function () {
    initialPanel.hide();
    loginPanel.show();
});

// register panel

var registerPanel = new RegisterPanel(panels[1]);

registerPanel.onNavigateBack(function () {
    registerPanel.hide();
    initialPanel.show();
});

registerPanel.onSubmitRegister(function (name, surname, email, password) {
    try {
        register(name, surname, email, password);

        registerPanel.hide();
        registerSuccessPanel.show();
    } catch (error) {
        registerPanel.showFeedback(error.message);
    }
});

// register success panel

var registerSuccessPanel = new RegisterSuccessPanel(panels[2]);

registerSuccessPanel.onNavigateToLogin(function () {
    registerSuccessPanel.hide();
    loginPanel.show();
});

// login panel

var loginPanel = new LoginPanel(panels[3]);

loginPanel.onNavigateBack(function () {
    loginPanel.hide();
    initialPanel.show();
});

loginPanel.onSubmitLogin(function (email, password) {
    try {
        login(email, password);

        loginPanel.hide();
        welcomePanel.show();
    } catch(error) {
        loginPanel.showFeedback(error.message);
    }
});

// welcome panel

var welcomePanel = new WelcomePanel(panels[4]);

welcomePanel.onClickLogout(function() {
    welcomePanel.hide();
    initialPanel.show();
});

welcomePanel.onSearch(function(){
    welcomePanel.hide();
})
