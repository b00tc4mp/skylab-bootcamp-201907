
/**
 * Presentation
 */

// initial panel

const landing = new Landing(document.getElementsByClassName('landing')[0])

landing.onNavigateToRegister( ()=> {
    landing.hide()
    register.show()
})

landing.onNavigateToLogin( ()=> {
    landing.hide()
    login.show()
})

// register panel

const register = new Register(document.getElementsByClassName('register')[0])

register.onNavigateBack( ()=> {
    register.hide()
    landing.show()
})

register.onSubmitRegister( (name, surname, email, password) =>{
    try {
        logic.register(name, surname, email, password)

        register.hide()
        registerSuccess.show()
    } catch (error) {
        register.showFeedback(error.message)
    }
});

// register success panel

const registerSuccess = new RegisterSuccess(document.getElementsByClassName('register-success')[0])

registerSuccess.onNavigateToLogin( ()=> {
    registerSuccess.hide()
    login.show()
})

// login panel

const login = new Login(document.getElementsByClassName('login')[0])

login.onNavigateBack( ()=> {
    login.hide()
    landing.show()
})

login.onSubmitLogin( (email, password) =>{
    try {
        logic.login(email, password)
        document.querySelector("h1").style.display="none"


        login.hide()
        home.show()
    } catch (error) {
        login.showFeedback(error.message)
    }
})

// welcome panel

const home = new DuckHome(document.getElementsByClassName('duck-home')[0])

home.onClickLogout( () =>{
    home.hide()
    landing.show()
})


// delete Ducks.prototype.paintItem; // WHAT if...
// home.results.paintItem = function(li, duck) { // WHAT if...
//     console.log(duck);
// };

home.search.onSearch( (query) =>{
    logic.searchDucks(query, (ducks) =>{
        home.results.listItems(ducks)
        home.results.show()
    })
})

home.results.onClickItem = (id) =>{
    logic.retrieveDuck(id, (duck) =>{
        home.results.hide()
        home.detail.displayDuck(duck)
        home.detail.show()
    })
}
home.detail.onNavigateBack( ()=>{
    home.results.show()
    home.detail.hide()
})
home.detail.addFav( ()=>{
    
})




























/**
 * Presentation
 */

// initial panel
/* 
var landing = new Landing(document.getElementsByClassName('landing')[0]);

landing.onNavigateToRegister(function () {
    landing.hide();
    register.show();
});

landing.onNavigateToLogin(function () {
    landing.hide();
    login.show();
}); */

// register panel
/* 
var register = new Register(document.getElementsByClassName('register')[0]);

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
}); */

// register success panel
/* 
var registerSuccess = new RegisterSuccess(document.getElementsByClassName('register-success')[0]);

registerSuccess.onNavigateToLogin(function () {
    registerSuccess.hide();
    login.show();
});
 */
// login panel
/* 
var login = new Login(document.getElementsByClassName('login')[0]);

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
}); */

// welcome panel
/* 
var home = new DuckHome(document.getElementsByClassName('duck-home')[0]);

home.onClickLogout(function () {
    home.hide();
    landing.show();
});
 */

// delete Ducks.prototype.paintItem; // WHAT if...
// home.results.paintItem = function(li, duck) { // WHAT if...
//     console.log(duck);
// };
/* 
home.search.onSearch(function (query) {
    logic.searchDucks(query, function(ducks) {
        home.results.listItems(ducks);
        home.results.show();
    });
});

home.results.onClickItem = function(id) {
    logic.retrieveDuck(id, function(duck) {
        home.results.hide();
        home.detail.displayDuck(duck);
        home.detail.show();
    });
};
home.detail.onNavigateBack(function (){
    home.results.show();
});
 */