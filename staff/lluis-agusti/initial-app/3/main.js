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
    // errorRegisterPanel.hide();
    initialPanel.show();
});

registerPanel.onRegisterSubmit(function (ename, surname, email, password, status) {
    try {
        register(name, surname, email, password, status);

        registerPanel.hide();
        // errorRegisterPanel.hide();
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

loginPanel.onNavigateBack(function (event) { 
    event.preventDefault();

    loginPanel.hide(); 
    errorRegisterPanel.hide();
    initialPanel.show();

});

loginPanel.onLoginSubmit(function (event) { 
    try {
        login(email, password);

        loginPanel.hide();
        // errorRegisterPanel.hide();
        welcomePanel.show();

    } catch(error) {
        loginPanel.showFeedback(error.message);
    }

});


var welcomePanel = new WelcomePanel(panels[4]);

welcomePanel.onLogoutPush(function (event) { 
    event.preventDefault();
    welcomePanel.hide(); 
    initialPanel.show();


});







var errorRegisterPanel = new ErrorRegisterPanel(panels[5]);



/* 
 errorRegisterPanel.onNavigatetoError(function (event) {
    event.preventDefault();

    var loginFeedback = errorRegisterPanel.container.children[1];

    loginFeedback.innerText = error.message;

    errorRegisterPanel.show();
});  */