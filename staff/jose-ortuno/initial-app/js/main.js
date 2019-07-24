'use strict';

/**
 * Presentation
 */

// DOM Elements
var panels = document.getElementById('panel');

// ---------------------------------------------------

/**
 * INITIAL PANEL
 */
var initialPanel = new InitialPanel(panels.children[1]);

// NAV: initialContainer --> registerPanel 
initialPanel.onNavigateToRegister(function (event) {
    event.preventDefault();

    initialPanel.hide();
    registerPanel.show();
});

// NAV: initialContainer --> loginPanel 
initialPanel.onNavigateToLogin(function (event) {
    event.preventDefault();

    initialPanel.hide();
    loginPanel.show();
});

// ---------------------------------------------------

/**
 * REGISTER PANEL
 */
var registerPanel = new RegisterPanel(panels.children[2]);

// NAV: Register --> initialContainer 
registerPanel.onNavigateBack(function(event) {
    event.preventDefault()

    registerPanel.hide();
    initialPanel.show();
});

 // NAV: Register --> Registered
 // GET: data users
 registerPanel.onRegisterSubmit(function(event) {
    event.preventDefault()
    
    var name = event.target.name.value;
    var surname = event.target.surname.value;
    var email = event.target.email.value;
    var password = event.target.password.value;

    try {
        userRegister(name, surname, email, password);

        registerPanel.hide();
        registerSuccesPanel.show();
        feedbackPanel.hide();

    } catch (error) {

        feedbackPanel.show();
        feedbackPanel.showFeedbackError(error.message);
    }
});

// ---------------------------------------------------

/**
 * REGISTER SUCCES PANEL
 */
var registerSuccesPanel = new RegisterSuccesPanel(panels.children[3]);

// NAV: Registered --> Login
registerSuccesPanel.onNavigateToLogin(function(event) {
    event.preventDefault();

    registerSuccesPanel.hide();
    loginPanel.show();
});

// ---------------------------------------------------

/**
 * LOGIN PANEL
 */
var loginPanel = new LoginPanel(panels.children[4]);

// NAV: Login --> Initial container
loginPanel.onNavigateBack(function(event) {
    event.preventDefault();

    loginPanel.hide();
    initialPanel.show();
});

 // NAV: Login --> Welcome page 
 // BEHAVIOR: Check if the user exists.
 loginPanel.onNavigateToWelcome(function(event) {
    event.preventDefault()

    var email = event.target.email.value;
    var password = event.target.password.value;

    try {
        userLogin(email, password);
        
        loginPanel.hide();
        welcomePanel.show();
        feedbackPanel.hide();
    } catch (error) {

        feedbackPanel.show();
        feedbackPanel.showFeedbackError(error.message);
    }
   
});

// ---------------------------------------------------

/**
 * WELCOME PANEL
 */

var welcomePanel = new WelcomePanel(panels.children[5]);

welcomePanel.logout(function(event) {
    event.preventDefault()

    welcomePanel.hide();
    initialPanel.show();
})

// ---------------------------------------------------

/**
 * FEEDBACK PANEL
 */

var feedbackPanel = new FeedbackPanel(panels.children[6]);

// ---------------------------------------------------

// TOOLS
/**
 * Function that allows desactivate a elemnt of the DOM.
 */
function turnOff(page) {
    page.classList.remove('panel--show');
    page.classList.add('panel--hide');
};

/**
 * Function that allows activate a elemnt of the DOM.
 */
function turnOn(page) {
    page.classList.remove('panel--hide');
    page.classList.add('panel--show');
};

