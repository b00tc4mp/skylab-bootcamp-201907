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

// register process panel
var registerPanel = new RegisterPanel(panels[1]);

registerPanel.onNavigateBack(function () {
    registerPanel.hide();
    initialPanel.show();
    errorPanel.hide();
});

registerPanel.onRegisterSubmit(function (name, surname, email, password) {
    event.preventDefault();
    try {
        register(name, surname, email, password);

        registerPanel.hide();
        registerSuccessPanel.show();
        errorPanel.hide();
    } catch (error) {
        errorPanel.show();
        errorPanel.showErrorMessage(error.message);
        /* registerPanel.showFeedback(error.message); */
    }
});

// register confirmation panel
var registerSuccessPanel = new RegisterSuccessPanel(panels[2]);

registerSuccessPanel.firstLog(function (password) {
    try {
        firstLogin(password);

        registerSuccessPanel.hide();
        homePanel.show();
        errorPanel.hide();
    } catch(error) {
        errorPanel.show();
        errorPanel.showErrorMessage(error.message);        
    }
});

// login panel
var loginPanel = new LoginPanel(panels[3]);

loginPanel.onNavigateBack(function () {
    loginPanel.hide();
    initialPanel.show()
    errorPanel.hide();
});

loginPanel.onLoginSubmit(function (email, password) {
    try {
        login(email, password);

        loginPanel.hide();
        homePanel.show();
        errorPanel.hide();
    } catch(error) {
        errorPanel.show();
        errorPanel.showErrorMessage(error.message);
        /* loginPanel.showFeedback(error.message); */
    }
});

// home panel
var homePanel = new HomePanel(panels[4]);

homePanel.onClickLogout(function () {
    homePanel.hide();
    initialPanel.show();
    searchPanel.hide();
    errorPanel.hide();
});

homePanel.onSearch(function (query) {
    try {
        search(query);

        searchPanel.show();
        errorPanel.hide();
    } catch(error) {
        errorPanel.show();
        errorPanel.showErrorMessage(error.message);
    }
});

// error panel
var errorPanel =  new ErrorPanel(panels[5]);

// search panel
var searchPanel = new SearchPanel(panels[6])