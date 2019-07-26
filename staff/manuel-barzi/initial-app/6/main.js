'use strict';

/**
 * Presentation
 */

var panels = document.getElementsByClassName('panel');

// initial panel

var landing = new Landing(panels[0]);

landing.onNavigateToRegister(function () {
    landing.hide();
    register.show();
});

landing.onNavigateToLogin(function () {
    landing.hide();
    login.show();
});

// register panel

var register = new Register(panels[1]);

register.onNavigateBack(function () {
    register.hide();
    landing.show();
});

register.onSubmitRegister(function (name, surname, email, password) {
    try {
        logic.register(name, surname, email, password);

        register.hide();
        registerSuccess.show();
    } catch (error) {
        register.showFeedback(error.message);
    }
});

// register success panel

var registerSuccess = new RegisterSuccess(panels[2]);

registerSuccess.onNavigateToLogin(function () {
    registerSuccess.hide();
    login.show();
});

// login panel

var login = new Login(panels[3]);

login.onNavigateBack(function () {
    login.hide();
    landing.show();
});

login.onSubmitLogin(function (email, password) {
    try {
        logic.login(email, password);

        login.hide();
        home.show();
    } catch (error) {
        login.showFeedback(error.message);
    }
});

// welcome panel

var home = new DuckHome(panels[4]);

home.onClickLogout(function () {
    home.hide();
    landing.show();
});

home.search.onSearch(function (query) {
    var request = new XMLHttpRequest()

    request.open('get', 'http://duckling-api.herokuapp.com/api/search?q=' + query);

    request.onload = function () {
        var results = JSON.parse(request.responseText);

        home.results.listItems(results);
    };

    request.send();
});

// home.results.paintItem = function(li, item) {
//     new Duck(li, item);
// };
