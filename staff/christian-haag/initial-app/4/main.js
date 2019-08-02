'use strict'
/**
 * All UI content here
 */



var panels = document.getElementsByClassName('panel')

//--------------------------------------------------------
//initial-panel
var initialPanel = new InitialPanel(panels[0])


//------------------------
initialPanel.onNavigateToRegister(function () {
    resetFormAlerts();
    initialPanel.hide();
    registerPanel.show();
});
//------------------------
initialPanel.onNavigateToLogin(function () {

    resetFormAlerts();

    initialPanel.hide();
    loginPanel.show();

});
//---------------------------------------------------------
//register Panel

var registerPanel = new RegisterPanel(panels[1])

registerPanel.onNavigateBack(function () {
    registerPanel.hide();
    initialPanel.show();
});

//--------------------

registerPanel.onSubmitRegister(function (name, surname, email, password) {

    try {
        register(name, surname, email, password);

        registerPanel.hide();
        registerSuccessPanel.show();

    } catch (error) {
        registerPanel.showFeedBack(error.message)

    }

});
//----------------------------------------------------------
// register sucess panel

var registerSuccessPanel = new RegisterSuccessPanel(panels[2])

registerSuccessPanel.onNavigateToLogin(function () {

    registerSuccessPanel.hide()
    loginPanel.show();

});
// //---------------------------------------------------------
// // login panel

var loginPanel = new LoginPanel(panels[3])
//var loginForm = loginPanel.container.children[0];
loginPanel.onNavigateBack(function () {
    loginPanel.hide()
    initialPanel.show();
});

loginPanel.onSubmitLogin(function (email, password) {
    try {
        login(email, password)

        loginPanel.hide()
        welcomePanel.show()

    } catch (error) {
        loginPanel.showFeedBack(error.message);
    }
});
// //-----------------------------
var welcomePanel = new WelcomePanel(panels[4]);

welcomePanel.onClickLogout(function () {
    welcomePanel.hide();
    initialPanel.show();
})

welcomePanel.onClickSearchProducts(function (query) {
    //try {
    //searchProduct(qry);
    searchQuery(query)
    //} catch (error) {
    //  console.error(error)
    //}
})
