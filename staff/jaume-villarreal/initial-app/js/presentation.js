// users curray
var users = new Curray();

//panels
var panels = document.getElementsByClassName("panel");


// initial panel

var initial = new Initial(panels[0]);

initial.onNavigateToRegister(function (event) {
    initial.hide();
    register.show();
});

initial.onNavigateToLogin(function (event) {
    initial.hide();
    login.show();
});


// register panel

var register = new Register(panels[1]);
var feedback = new Feedback(panels[1].children[2]);

register.onNavigateBack(function (event) {
    register.resetInputs();

    register.hide();
    feedback.hide();
    initial.show();
});

register.onRegisterSubmit(function (name , surname , email , password) {
    try {
        logic.register(name, surname, email, password);

        register.resetInputs();
        
        register.hide();
        registerSuccess.show();
    } catch (error) {
        register.showFeedback(error.message);
    }
});

// Register Success
var registerSuccess = new RegisterSuccess(panels[2]);

registerSuccess.onNavigateToInit(function(event){
    registerSuccess.hide();
    initial.show();
});

registerSuccess.onNavigateToLogin(function(event){
    registerSuccess.hide();
    login.show();
});


// loginPanel
var login = new Login(panels[3]);
var feedbackLogin = new Feedback(panels[3].children[2]);

login.onNavigateBack(function(event){
    login.resetInputs();

     login.hide();
     feedbackLogin.hide();
     initial.show();
});

login.onSuccessLogin(function(event){
    event.preventDefault();

    var mail = event.target.logMail.value;
    var password = event.target.logPassword.value;
    
    try{
        logic.login(mail , password);

        login.resetInputs();
        
        login.hide();
        feedbackLogin.hide();
        home.show();

    } catch(error){
        login.showFeedback(error.message);
    }
});


// //home
var home = new DuckHome(panels[4]);

home.onClickLogout(function(event){
    home.hide();
    initial.show();
});

home.search.onSearch(function(query){
    logic.searchDucks(query , function(results){
        home.results.listItems(results);
    })
});

home.results.onClickItem(function(id) {
    logic.retrieveDuck(id, function(duck) {
        home.results.hide();
        home.detail.displayDuck(duck);
        home.detail.show();
    })
});