// users curray
var users = new Curray();

//panels
var panels = document.getElementsByClassName("panel");
var initialPanel = panels[0];
var registerPanel = panels[1];
var successRegisterPanel = panels[2];
var loginPanel = panels[3];
var homePanel = panels[4];

// elements
var initialBtnSet = initialPanel.children[0]
var registerForm = registerPanel.children[1];
var loginForm = loginPanel.children[1];

// links
var registerLink = initialBtnSet.children[0];
var loginLink = initialBtnSet.children[1];
var logoutLink = homePanel.children[1];
var backInitialLink = registerPanel.children[3];
var backLoginLink = loginPanel.children[3];
var loginSuccessLink = successRegisterPanel.children[1].children[0];


//register link
registerLink.addEventListener('click' , function(e){
    e.preventDefault();
    toggle(initialPanel);
    toggle(registerPanel);
});

// login link
loginLink.addEventListener("click", function(e){ 
    e.preventDefault();
    toggle(initialPanel);
    toggle(loginPanel);
});


// register
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


backInitialLink.addEventListener("click" , function(event){
    event.preventDefault();
    toggle(registerPanel);
    toggle(initialPanel);
    resetInputs();
});


// successRegisterPanel
loginSuccessLink.addEventListener("click" , function(event){
    event.preventDefault();
    toggle(successRegisterPanel);
    toggle(loginPanel);
    resetInputs();
});


// loginPanel
backLoginLink.addEventListener("click" , function(event){
    event.preventDefault();
    toggle(loginPanel);
    toggle(initialPanel);
    // resetInputs();
});

loginForm.addEventListener("submit" , function(event){
    event.preventDefault();
    var mail = event.target.logMail.value;
    var password = event.target.logPassword.value;

    var loggedUser = users.find(function(user){
        return(mail === user.mail && password === user.password);
    });

    if(loggedUser !== undefined){
        toggle(loginPanel);
        toggle(homePanel);
        homePanel.children[0].textContent = "Welcome " + loggedUser.name + ' ' + loggedUser.surname;

    } else{
        alert("Wrong credentials");
        resetInputs();
    }
}); 

//homePanel
logoutLink.addEventListener("click" , function(event){
    event.preventDefault();
    toggle(homePanel);
    toggle(initialPanel);
    resetInputs();
})

// ===================
//auxiliar functions
// ===================
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


// var validateString = function (str){
//     var regex = /^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/;
//     return regex.test(str);
// };





