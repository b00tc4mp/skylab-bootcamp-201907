'use strict'
/**
 * All UI content here
 */



var panels = document.getElementsByClassName('panel')

//--------------------------------------------------------
//initial-panel
var landing = new Landing(panels[0])


//------------------------
landing.onNavigateToRegister(function () {
    //resetFormAlerts();
    landing.hide();
    register.show();
});
//------------------------
landing.onNavigateToLogin(function () {

    //resetFormAlerts();

    landing.hide();
    login.show();

});
//---------------------------------------------------------
//register Panel

var register = new Register(panels[1])

register.onNavigateBack(function () {
    register.hide();
    landing.show();
});

//--------------------

register.onSubmitRegister(function (name, surname, email, password) {

    try {
        logic.register(name, surname, email, password);

        register.hide();
        registerSuccessPanel.show();

    } catch (error) {
        register.showFeedBack(error.message)
    }

});
//----------------------------------------------------------
// register sucess panel

var registerSuccessPanel = new RegisterSuccess(panels[2])

registerSuccessPanel.onNavigateToLogin(function () {
    registerSuccessPanel.hide()
    login.show();

});
// //---------------------------------------------------------
// // login panel

var login = new Login(panels[3])
//var loginForm = loginPanel.container.children[0];
login.onNavigateBack(function () {
    login.hide()
    landing.show();
});

login.onSubmitLogin(function (email, password) {
    try {
        logic.login(email, password)

        login.hide()
        home.show()

    } catch (error) {
        login.showFeedBack(error.message);
    }
});
// //-----------------------------
var home = new DuckHome(panels[4]);
var resultPanel = new ResultPanel(panels[5]);

home.onClickLogout(function () {
    home.hide();
    landing.show();
})

home.search.onSearch(function (query) {
    logic.searchDucks(query, function (results) {
        resultPanel.result.listItems(results);
    });
    resultPanel.show()
});

// home.refreshProducts(function () {
//     productPanel.hide();
// })



// productPanel.hideOnLogOut(function () {
//     productPanel.hide();
//     landing.show();
// })