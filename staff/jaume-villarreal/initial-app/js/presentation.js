// users curray
var users = new Curray();

//panels
var panels = document.getElementsByClassName("panel");


// initial panel

var initialPanel = new InitialPanel(panels[0]);

initialPanel.onNavigateToRegister(function (event) {
    event.preventDefault();

    initialPanel.hide();
    registerPanel.show();
});

initialPanel.onNavigateToLogin(function (event) {
    event.preventDefault();

    initialPanel.hide();
    loginPanel.show();
});


// register panel

var registerPanel = new RegisterPanel(panels[1]);
var feedbackRegisterPanel = new FeedbackPanel(panels[1] .children[2]);

registerPanel.onNavigateBack(function (event) {
    event.preventDefault();

    registerPanel.resetInputs();

    registerPanel.hide();
    feedbackRegisterPanel.hide();
    initialPanel.show();
});

registerPanel.onRegisterSubmit(function (event) {
    event.preventDefault();

    var name = event.target.name.value;
    var surname = event.target.surname.value;
    var email = event.target.mail.value;
    var password = event.target.password.value;

    try {
        register(name, surname, email, password);

        registerPanel.resetInputs();
        
        registerPanel.hide();
        registerSuccessPanel.show();
    } catch (error) {
        feedbackRegisterPanel.show();
        feedbackRegisterPanel.showErrors(error);
    }
});


// // successRegisterPanel
var registerSuccessPanel = new RegisterSuccessPanel(panels[2]);

registerSuccessPanel.onNavigateToInit(function(event){
    event.preventDefault();

    registerSuccessPanel.hide();
    initialPanel.show();
});

registerSuccessPanel.onNavigateToLogin(function(event){
    event.preventDefault();

    registerSuccessPanel.hide();
    loginPanel.show();
});



// // loginPanel
var loginPanel = new LoginPanel(panels[3]);
var feedbackLoginPanel = new FeedbackPanel(panels[3] .children[2]);

loginPanel.onNavigateInit(function(event){
     event.preventDefault();

     loginPanel.resetInputs();

     loginPanel.hide();
     feedbackLoginPanel.hide();
     initialPanel.show();
});

loginPanel.onSuccessLogin(function(event){
    event.preventDefault();

    var mail = event.target.logMail.value;
    var password = event.target.logPassword.value;
    
    try{
        login(mail , password);

        loginPanel.resetInputs();
        
        loginPanel.hide();
        feedbackLoginPanel.hide();
        homePanel.show();

    } catch(error){
        feedbackLoginPanel.show();
        feedbackLoginPanel.showErrors(error);
    }
});


// //homePanel
var homePanel = new HomePanel(panels[4]);
homePanel.onClickLogout(function(event){
    homePanel.hide();
    initialPanel.show();
})

var resetInputs = function(){
    var inputs = document.getElementsByTagName("input");
    for(var i = 0 ; i<inputs.length ; i++){
        inputs[i].value='';
    }
};
    




