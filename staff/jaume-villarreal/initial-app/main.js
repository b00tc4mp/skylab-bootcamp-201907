// users array
var users = [];
//panels
var panels = document.getElementsByClassName("panel");

//initialPanel
var initialPanel = panels[0];
var initialBtnSet = initialPanel.children[0]

var registerLink = initialBtnSet.children[0];
var loginLink = initialBtnSet.children[1];

registerLink.addEventListener('click' , function(e){
    e.preventDefault();
    toggle(initialPanel);
    toggle(registerPanel);
});

loginLink.addEventListener("click", function(e){ 
    e.preventDefault();
    toggle(initialPanel);
    toggle(loginPanel);
});


// registerPanel
var registerPanel = panels[1];
var registerForm = registerPanel.children[1];

registerForm.addEventListener("submit" , function(event){
    event.preventDefault();

    var name = event.target.name.value;
    var surname = event.target.surname.value;
    var mail = event.target.mail.value;
    var password = event.target.password.value;

    users.push({
        name: name,
        surname: surname,
        mail: mail,
        password: password
    });

    resetInputs();
    toggle(registerPanel);
    toggle(successRegisterPanel);
});

backInitialLink = registerPanel.children[2];
backInitialLink.addEventListener("click" , function(event){
    event.preventDefault();
    toggle(registerPanel);
    toggle(initialPanel);
    resetInputs();
});


// successRegisterPanel
var successRegisterPanel = panels[2];
var loginSuccessLink = successRegisterPanel.children[1].children[0];
loginSuccessLink.addEventListener("click" , function(event){
    event.preventDefault();
    toggle(successRegisterPanel);
    toggle(loginPanel);
    resetInputs();
});


// loginPanel
var loginPanel = panels[3];
var loginForm = loginPanel.children[1];
backLoginLink = loginPanel.children[2];

backLoginLink.addEventListener("click" , function(event){
    event.preventDefault();
    toggle(loginPanel);
    toggle(initialPanel);
    resetInputs();
});

loginForm.addEventListener("submit" , function(event){
    event.preventDefault();
    var mail = event.target.logMail.value;
    var password = event.target.logPassword.value;

    var loggedUser;

    var userExists = users.some(function(user){
        loggedUser = user;
        return(mail === user.mail && password === user.password);
    });

    if(userExists){
        toggle(loginPanel);
        toggle(landingPanel);
    } else{
        alert("Wrong credentials");
        resetInputs();
    }
}); 

// landingPanel
var landingPanel = panels[4];
var logoutLink = landingPanel.children[1];
logoutLink.addEventListener("click" , function(event){
    event.preventDefault();
    toggle(landingPanel);
    toggle(initialPanel);
    resetInputs();
})

//auxiliar functions
var toggle = function(block){
    if(block.classList.contains('panel--hide')){
        block.classList.add("panel--show");
        block.classList.remove("panel--hide");
    } else{
        block.classList.remove("panel--show");
        block.classList.add("panel--hide");
    }
};

var resetInputs = function(){
    var inputs = document.getElementsByTagName("input");
    for(var i = 0 ; i<inputs.length ; i++){
        inputs[i].value='';
    }
};





