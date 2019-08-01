'use strict'
/**
 * All UI content here
 */



var panels = document.getElementsByClassName('panel')

//--------------------------------------------------------
//initial-panel
var initialPanel = new InitialPanel(panels[0])


//------------------------
initialPanel.onNavigateToRegister(function (event) {
    event.preventDefault();
    resetAlerts();
    initialPanel.hide();
    registerPanel.show();
});
//------------------------
initialPanel.onNavigateToLogin(function (event) {
    event.preventDefault();
    resetAlerts();
    initialPanel.hide();
    loginPanel.show();

});
//---------------------------------------------------------
//register Panel

var registerPanel = new RegisterPanel(panels[1])

registerPanel.onNavigateBack(function (event) {
    event.preventDefault();

    registerPanel.hide();
    initialPanel.show();
});

//--------------------

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
        registerPanel.showFeedBack(error)

    }

});
//----------------------------------------------------------
// register sucess panel

var registerSuccessPanel = new RegisterSuccessPanel(panels[2])

registerSuccessPanel.navigateToLogin(function (event) {
    event.preventDefault();

    registerSuccessPanel.hide()
    loginPanel.show();

});
// //---------------------------------------------------------
// // login panel

var loginPanel = new LoginPanel(panels[3])
//var loginForm = loginPanel.container.children[0];

loginPanel.onLoginSubmit(function (event) {
    event.preventDefault();

    var email = event.target.email.value;
    var password = event.target.password.value;

    try {
        login(email, password)

        loginPanel.hide()
        welcomePanel.show()

    } catch (error) {
        var registerFeedback = loginPanel.container.children[0].lastElementChild
        registerFeedback.innerText = error.message
    }
});
// //-----------------------------
var welcomePanel = new WelcomePanel(panels[4]);
var name = welcomePanel.container.children[1]


welcomePanel.onClickLogout(function (event) {
    event.preventDefault();
    //name.innerText = users;
    welcomePanel.hide();
    initialPanel.show();
})

