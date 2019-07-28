/**
 * Presentation
 */

// initial 

const landing = new Landing(document.getElementsByClassName('landing')[0]);

landing.onNavigateToRegister(() => {
    landing.hide();
    register.show();
});

landing.onNavigateToLogin(() => {
    landing.hide();
    login.show();
});

// register 

const register = new Register(document.getElementsByClassName('register')[0]);

register.onNavigateBack(() => {
    register.hide();
    register.clearInputs();
    landing.show();
});

register.onSubmitRegister((name, surname, email, password) => {
    try {
        logic.register(name, surname, email, password);

        register.hide();
        register.clearInputs();
        registerSuccess.show();
    } catch (error) {
        register.showFeedback(error.message);
    }
});

// register success 

const registerSuccess = new RegisterSuccess(document.getElementsByClassName('register-success')[0]);

registerSuccess.onNavigateToLogin(() => {
    registerSuccess.hide();
    registerSuccess.clearInputs();
    login.show();
});

// login 

const login = new Login(document.getElementsByClassName('login')[0]);

login.onNavigateBack(() => {
    login.hide();
    login.clearInputs();
    landing.show();
});

login.onSubmitLogin((email, password) => {
    try {
        logic.login(email, password);
        
        login.hide();
        login.clearInputs();
        home.show();
    } catch (error) {
        login.showFeedback(error.message);
    }
});

// home

const home = new DuckHome(document.getElementsByClassName('duck-home')[0]);

home.onClickLogout(() => {

    home.hide();
    landing.show();
    home.results.hide();
    home.results.clearInputs();
    home.feedback.hide();
});


// delete Ducks.prototype.paintItem; // WHAT if...
// home.results.paintItem = function(li, duck) { // WHAT if...
//     console.log(duck);
// };

home.search.onSearch(query => {
    try {
        logic.searchDucks(query, ducks => {
            try {
                home.results.listItems(ducks);
                home.results.show();
            } catch (error) {
                home.showFeedback(error.message);
            }
        });
        home.feedback.hide();
    } catch (error) {
        home.showFeedback(error.message);
    }
});

home.results.onClickItem = id => {
    logic.retrieveDuck(id, duck => {
        home.results.hide();
        home.detail.displayDuck(duck);
        home.detail.show();
    });
};

home.results.addToFavorites = id => {
    logic.retrieveDuck(id, duck => {
        users.push(duck);
    });
};

home.detail.onNavigateToResults(() => {
    home.detail.hide();
    home.results.show();
});