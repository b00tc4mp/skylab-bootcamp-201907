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
initialPanel.onNavigateToRegister(function () {
    initialPanel.hide();
    registerPanel.show();
});

// NAV: initialContainer --> loginPanel 
initialPanel.onNavigateToLogin(function () {
    initialPanel.hide();
    loginPanel.show();
});

// ---------------------------------------------------

/**
 * REGISTER PANEL
 */
var registerPanel = new RegisterPanel(panels.children[2]);

// NAV: Register --> initialContainer 
registerPanel.onNavigateBack(function() {
    registerPanel.hide();
    initialPanel.show();
});

 // NAV: Register --> Registered
 // PUSH-->COMPO: data user
 registerPanel.onRegisterSubmit(function(name, surname, email, password) {
    try {
        userRegister(name, surname, email, password);

        registerPanel.hide();
        registerSuccesPanel.show();

    } catch (error) {
        registerPanel.showFeedback(error.message);
    }
});

// ---------------------------------------------------

/**
 * REGISTER SUCCES PANEL
 */
var registerSuccesPanel = new RegisterSuccesPanel(panels.children[3]);

// NAV: Registered --> Login
registerSuccesPanel.onNavigateToLogin(function() {
    registerSuccesPanel.hide();
    loginPanel.show();
});

// ---------------------------------------------------

/**
 * LOGIN PANEL
 */
var loginPanel = new LoginPanel(panels.children[4]);

// NAV: Login --> Initial container
loginPanel.onNavigateBack(function() {
    loginPanel.hide();
    initialPanel.show();
});

 // NAV: Login --> Welcome page 
 // BEHAVIOR: Check if the user exists.
 loginPanel.onNavigateToWelcome(function(email, password) {
    try {
        userLogin(email, password);
        
        loginPanel.hide();
        welcomePanel.show();
        searchPanel.show();
    } catch (error) {
        loginPanel.showFeedback(error.message);
    }
   
});

// ---------------------------------------------------

/**
 * WELCOME PANEL
 */

var welcomePanel = new WelcomePanel(panels.children[5]);

// NAV: Welcome --> Initial panel
welcomePanel.onClickLogout(function() {
    welcomePanel.hide();
    initialPanel.show();
})

// ---------------------------------------------------

/**
 * SEARCH PANEL
 */
var searchPanel = new SearchPanel(panels.children[6])

searchPanel.onSubmitSearch(function(query){
    try {
        var result = searchApi(query);
        
        productPanel.showProducts(result);
        productPanel.show();
      
    } catch (error) {
        alert(error.message)
    }
 });

// ---------------------------------------------------

/**
 * PRODUCT PANEL
 */

var productPanel = new ProductPanel(panels.children[7])



// ---------------------------------------------------



