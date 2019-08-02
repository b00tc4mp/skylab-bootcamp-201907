'use strict'
/**
 * All UI content here
 */


let panels = (className, index) => document.getElementsByClassName(className)[index];


//initial-panel
const landing = new Landing(panels('landing', 0))



landing.onNavigateToRegister(function () {

    logic.resetFormAlerts();
    landing.hide();
    register.show();
});

landing.onNavigateToLogin(function () {

    logic.resetFormAlerts();
    landing.hide();
    login.show();

});

//register Panel

const register = new Register(panels('register', 0))

register.onNavigateBack(function () {
    register.hide();
    landing.show();
});

register.onSubmitRegister(function (name, surname, email, password) {

    try {
        logic.register(name, surname, email, password);

        register.hide();
        registerSuccessPanel.show();

    } catch (error) {
        register.showFeedBack(error.message)
    }

});

// register sucess panel

const registerSuccessPanel = new RegisterSuccess(panels('register-success', 0))

registerSuccessPanel.onNavigateToLogin(function () {
    registerSuccessPanel.hide()
    login.show();

});

// // login panel

const login = new Login(panels('login', 0))

login.onNavigateBack(function () {
    login.hide()
    landing.show();
});

login.onSubmitLogin(function (email, password) {
    try {
        logic.login(email, password)
        logic.userName(email)
        login.hide()
        home.show()

    } catch (error) {
        login.showFeedBack(error.message);
    }
});
// //-----------------------------
const home = new DuckHome(panels('home', 0));
const resultPanel = new ResultPanel(panels('product-panel', 0));

home.onClickLogout(function () {
    home.hide();
    logic.hideSection(resultPanel);
    landing.show();
})

home.search.onSearch(function (query) {
    try {
        home.onSearchError.hide();
        logic.searchDucks(query, function (results) {
            resultPanel.result.listItems(results);
            resultPanel.show()
            resultPanel.result.show()
            resultPanel.detail.hide()
        });

    } catch (error) {
        home.showFeedBack(error.message)

    }
});


resultPanel.result.onClickItem(id => {
    logic.searchDuckDetails(id, function (duck) {
        resultPanel.detail.displayDuck(duck);
        resultPanel.result.hide();
        resultPanel.detail.show();
    });

})

resultPanel.detail.onClickBack(() => {
    resultPanel.detail.hide();
    resultPanel.result.show();
})


