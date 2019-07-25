'use strict';

/**
 * Presentation
 */

var panels = document.getElementsByClassName('panel');

// initial panel / landing

var landing = new InitialPanel(panels[0])

landing.onNavigateToRegister(function () {
    landion.hide();
    register.show();
});

landing.onNavigateToLogin(function () {
    landing.hide();
    login.show();
});

// register panel

var register = new Register(panels[1]);

register.onNavigateBack(function () {
    registerPanel.hide();
    initialPanel.show();
});

register.onSubmitRegister(function (name, surname, email, password) {
    try {
        register(name, surname, email, password);

        register.hide();
        registerSuccess.show();
    } catch (error) {
        register.showFeedback(error.message);
    }
});







var registerSuccess = new RegisterSuccessPanel(panels[2]);

registerSuccess.onNavigateToLogin(function () {
    registerSuccess.hide();
    login.show();
});








var login = new Login(panels[3]);

login.onNavigateBack(function () {
    login.hide();
    landing.show();
});

login.onSubmitLogin(function (email, password) {
    try {
        login(email, password);

        login.hide();
        home.show();
    } catch(error) {
        loginPanel.showFeedback(error.message);
    }
});





var home= new DuckHome(panels[4]);

home.onClickLogout(function () {
    home.hide();
    landing.show();
});

home.search.onSearch(function (query) {
    try {
        searchRequest(query);

    } catch(error) {

        // loginPanel.showFeedback(error.message);
    }

});