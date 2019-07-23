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

registerPanel.onNavigateBack(function (event) {
    event.preventDefault();

    registerPanel.hide();
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

        registerPanel.hide();
        registerSuccessPanel.show();
    } catch (error) {

        // var registerFeedback = registerPanel.container.children[1];
        // registerFeedback.innerText = error.message;
        // debugger
        console.log(error);
        var feedbackPanel = new FeedbackPanel(panels[1].children[2]);
        feedbackPanel.show();
        feedbackPanel.showErrors(error);
    }
});


// // successRegisterPanel

// var successRegisterPanel = panels[2];
// var registerSuccessLink = successRegisterPanel.children[1].children[0];
// registerSuccessLink.addEventListener("click" , function(event){
//     event.preventDefault();
//     toggle(successRegisterPanel);
//     toggle(loginPanel);
//     resetInputs();
// });
var registerSuccessPanel = new RegisterSuccessPanel(panels[2]);

registerSuccessPanel.onSuccessRegister(function(event){
    event.preventDefault();

    registerSuccessPanel.hide();
    loginPanel.show();
    // resetInputs();   
});



// // loginPanel
// var loginPanel = panels[3];
// var loginForm = loginPanel.children[1];
// var backLoginLink = loginPanel.children[3];

// backLoginLink.addEventListener("click" , function(event){
//     event.preventDefault();
//     toggle(loginPanel);
//     toggle(initialPanel);
//     resetInputs();
//     resetFeedback();
// });

// loginForm.addEventListener("submit" , function(event){
//     event.preventDefault();

//     var mail = event.target.logMail.value;
//     var password = event.target.logPassword.value;
    
//     try{
//         login(mail , password);
//         toggle(loginPanel);
//         toggle(homePanel);
//     } catch(error){
//         var registerFeedback = loginPanel.getElementsByClassName('panel__feedback')[0];
//         registerFeedback.style.display = "block";
//         registerFeedback.innerText = error.message;
//     }
// });

var loginPanel = new LoginPanel(panels[3]);

loginPanel.onNavigateInit(function(event){
     event.preventDefault();
     loginPanel.hide();
     initialPanel.show();
//     resetInputs();
//     resetFeedback();
});

loginPanel.onSuccessLogin(function(event){
    event.preventDefault();

    var mail = event.target.logMail.value;
    var password = event.target.logPassword.value;
    
    try{
        login(mail , password);
        loginPanel.hide();
        homePanel.show();
    } catch(error){
        // var registerFeedback = loginPanel.getElementsByClassName('panel__feedback')[0];
        // registerFeedback.style.display = "block";
        // registerFeedback.innerText = error.message;
        console.log(error);
    }
});


// //homePanel
// var homePanel = panels[4];
// var logoutLink = homePanel.children[1];
// logoutLink.addEventListener("click" , function(event){
//     event.preventDefault();
//     toggle(homePanel);
//     toggle(initialPanel);
//     resetInputs();
// })

var homePanel = new H   omePanel(panels[4]);
homePanel.onLogout(function(event){
    event.preventDefault();
    homePanel.hide();
    initialPanel.show();
    // resetInputs();   
})


// ===================
//auxiliar functions
// ===================
// var toggle = function(block){
//     if(block.classList.contains('panel--hide')){
//         block.classList.add("panel--show");
//         block.classList.remove("panel--hide");
//     } else{
//         block.classList.remove("panel--show");
//         block.classList.add("panel--hide");
//     }
// };

var resetInputs = function(){
    var inputs = document.getElementsByTagName("input");
    for(var i = 0 ; i<inputs.length ; i++){
        inputs[i].value='';
    }
};

var resetFeedback = function(){
    feedbackPanel = document.getElementsByClassName('panel__feedback');
    for(var i = 0 ; i<feedbackPanel.length ; i++){
        feedbackPanel[i].style.display = "none";
        feedbackPanel[i].innerText = "";
    }
};
    




