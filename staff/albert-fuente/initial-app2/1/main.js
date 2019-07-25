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
    errorRegisterPanel.hide();
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
        errorRegisterPanel.hide();

    } catch (error) {
/*         var registerFeedback = registerPanel.container.children[1];

        registerFeedback.innerText = error.message; */
        errorRegisterPanel.show();
        var errorFeedback=errorRegisterPanel.container.children[1];
        errorFeedback.innerText=error.message;
    }
});

// register success panel

var registerSuccessPanel = new SuccessRegisterPanel(panels[2]);
registerSuccessPanel.onNavigateLogin(function (event) {
   event.preventDefault();
   registerSuccessPanel.hide();
   loginPanel.show();
});

// LOGIN panel


var loginPanel = new LoginPanel(panels[3]);

loginPanel.onNavigateBack(function (event) {
    event.preventDefault();

    loginPanel.hide();
    initialPanel.show();
    errorRegisterPanel.hide();

});

loginPanel.onLoginSubmit(function (event) {
    event.preventDefault();

    var email = event.target.email.value;
    var password = event.target.password.value;

    try {
        login(email, password);

        loginPanel.hide();
        welcomePanel.show();
        errorRegisterPanel.hide();
    } catch(error) {
/*         var loginFeedback = loginPanel.container.children[1];

        loginFeedback.innerText = error.message; */
        errorRegisterPanel.show();
        var errorFeedback=errorRegisterPanel.container.children[1];
        errorFeedback.innerText=error.message;
        
    }
});

// WELCOME PANEL
var welcomePanel= new WelcomePanel(panels[4]);

welcomePanel.onNavigateBack(function (event) {
    event.preventDefault();

    welcomePanel.hide();
    initialPanel.show();
});

var errorRegisterPanel=new ErrorPanel(panels[5]);


/* var welcomeContainer = panels[4];

var welcomePanel = new Panel(welcomeContainer);  */























/**
 * Presentation
 */

/* var panels = document.getElementsByClassName('panel');
 */
// initial panel


/* var initialPanel = panels[0];

var registerLink = initialPanel.children[0];
var loginLink = initialPanel.children[1];

registerLink.addEventListener('click', function (event) {
    event.preventDefault();

    initialPanel.classList.remove('panel--show');
    initialPanel.classList.add('panel--hide');

    registerPanel.classList.remove('panel--hide');
    registerPanel.classList.add('panel--show');
});

loginLink.addEventListener('click', function (event) {
    event.preventDefault();

    initialPanel.classList.remove('panel--show');
    initialPanel.classList.add('panel--hide');

    loginPanel.classList.remove('panel--hide');
    loginPanel.classList.add('panel--show');
}); */

// register panel

/* var registerPanel = panels[1];

var registerBackLink = registerPanel.children[2];

registerBackLink.addEventListener('click', function (event) {
    event.preventDefault();

    registerPanel.classList.remove('panel--show');
    registerPanel.classList.add('panel--hide');

    initialPanel.classList.remove('panel--hide');
    initialPanel.classList.add('panel--show');
});

var registerForm = registerPanel.children[0];

registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var name = event.target.name.value;
    var surname = event.target.surname.value;
    var email = event.target.email.value;
    var password = event.target.password.value;

    try {
        register(name, surname, email, password);

        registerPanel.classList.remove('panel--show');
        registerPanel.classList.add('panel--hide');

        registerSuccessPanel.classList.remove('panel--hide');
        registerSuccessPanel.classList.add('panel--show');
    } catch (error) {
        var registerFeedback = registerPanel.children[1];

        registerFeedback.innerText = error.message;
    }
}); */

// register success panel

/* var registerSuccessPanel = panels[2];

var registerSuccessLoginLink = registerSuccessPanel.children[0];

registerSuccessPanel.addEventListener('click', function (event) {
    event.preventDefault();

    registerSuccessPanel.classList.remove('panel--show');
    registerSuccessPanel.classList.add('panel--hide');

    loginPanel.classList.remove('panel--hide');
    loginPanel.classList.add('panel--show');
}); */

// login panel

/* var loginPanel = panels[3];

var loginBackLink = loginPanel.children[2];

loginBackLink.addEventListener('click', function (event) {
    event.preventDefault();

    loginPanel.classList.remove('panel--show');
    loginPanel.classList.add('panel--hide');

    initialPanel.classList.remove('panel--hide');
    initialPanel.classList.add('panel--show');
});

var loginForm = loginPanel.children[0];

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var email = event.target.email.value;
    var password = event.target.password.value;

    try {
        login(email, password);

        loginPanel.classList.remove('panel--show');
        loginPanel.classList.add('panel--hide');

        welcomePanel.classList.remove('panel--hide');
        welcomePanel.classList.add('panel--show');
    } catch(error) {
        var loginFeedback = loginPanel.children[1];

        loginFeedback.innerText = error.message;
    }
});

var welcomePanel = panels[4];

 */