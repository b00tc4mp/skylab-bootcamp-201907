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
    errorRegisterPanel.hide();
    initialPanel.show();
});

registerPanel.onRegisterSubmit(function (event) {
    event.preventDefault();

    var name = event.target.name.value;
    var surname = event.target.surname.value;
    var email = event.target.email.value;
    var password = event.target.password.value;
    var status = 0;

    try {
        register(name, surname, email, password);

        registerPanel.hide();
        errorRegisterPanel.hide();
        registerSuccessPanel.show();
    } catch (error) {
        // var registerFeedback = registerPanel.container.children[1];

        errorRegisterPanel.show();
        
        var errorMessage = errorRegisterPanel.container.children[0];
        errorMessage.innerText= error.message;
    }
});


// register success panel

var registerSuccessPanel = new RegisterSuccessPanel(panels[2]);

registerSuccessPanel.onNavigateToLogin(function (event) {
    event.preventDefault();

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
    event.preventDefault();

    var email = event.target.email.value;
    var password = event.target.password.value;

    try {
        login(email, password);

        loginPanel.hide();
        errorRegisterPanel.hide();
        welcomePanel.show();

    } catch(error) {

        errorRegisterPanel.show();
        
        var errorMessage = errorRegisterPanel.container.children[0];
        errorMessage.innerText= error.message;

    


    }

});


var welcomePanel = new WelcomePanel(panels[4]);

welcomePanel.onLogoutPush(function (event) { 
    event.preventDefault();
    // // debugger;
    // // logOut();
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