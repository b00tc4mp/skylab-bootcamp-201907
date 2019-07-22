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
    
    // initialPanel.classList.remove("panel--show");
    // initialPanel.classList.add("panel--hide");
    // registerPanel.classList.remove("panel--hide");
    // registerPanel.classList.add("panel--show");
});

loginLink.addEventListener("click", function(e){
    
    e.preventDefault();

    toggle(initialPanel);
    toggle(loginPanel);
    
    // initialPanel.classList.remove("panel--show");
    // initialPanel.classList.add("panel--hide");
    // loginPanel.classList.remove("panel--hide");
    // loginPanel.classList.add("panel--show");
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

    event.target.name.value = '';
    event.target.surname.value = '';
    event.target.mail.value = '';
    event.target.password.value = '';
    
    toggle(registerPanel);
    toggle(successRegisterPanel);

    // registerPanel.classList.remove("panel--show");
    // registerPanel.classList.add("panel--hide");
    // successRegisterPanel.classList.remove("panel--hide");
    // successRegisterPanel.classList.add("panel--show");
});

backInitialLink = registerPanel.children[2];
backInitialLink.addEventListener("click" , function(event){
    
    event.preventDefault();

    toggle(registerPanel);
    toggle(initialPanel);

    // registerPanel.classList.remove("panel--show");
    // registerPanel.classList.add("panel--hide");
    // initialPanel.classList.remove("panel--hide");
    // initialPanel.classList.add("panel--show");
});


// successRegisterPanel
var successRegisterPanel = panels[2];

var loginSuccessLink = successRegisterPanel.children[1].children[0];

loginSuccessLink.addEventListener("click" , function(event){

    event.preventDefault();

    toggle(successRegisterPanel);
    toggle(loginPanel);

    // successRegisterPanel.classList.remove("panel--show");
    // successRegisterPanel.classList.add("panel--hide");
    // loginPanel.classList.remove("panel--hide");
    // loginPanel.classList.add("panel--show");
});


// loginPanel
var loginPanel = panels[3];

var loginForm = loginPanel.children[1];
backLoginLink = loginPanel.children[2];

backLoginLink.addEventListener("click" , function(event){
    
    event.preventDefault();
    
    toggle(loginPanel);
    toggle(initialPanel);

    // loginPanel.classList.remove("panel--show");
    // loginPanel.classList.add("panel--hide");
    // initialPanel.classList.remove("panel--hide");
    // initialPanel.classList.add("panel--show");
});

loginForm.addEventListener("submit" , function(event){
    event.preventDefault();
    var mail = event.target.logMail.value;
    var password = event.target.logPassword.value;

    if(mail === users[0].mail && password === users[0].password){
        toggle(loginPanel);
        toggle(landingPanel);

        // loginPanel.classList.remove("panel--show");
        // loginPanel.classList.add("panel--hide");
        // landingPanel.classList.remove("panel--hide");
        // landingPanel.classList.add("panel--show");
    } else{
        alert("Wrong credentials");
        // password = '';
        // mail = '';
        event.target.logMail.value = '';
        event.target.logPassword.value = '';
    }
}); 

// landingPanel
var landingPanel = panels[4];
var logoutLink = landingPanel.children[1];
logoutLink.addEventListener("click" , function(event){
    event.preventDefault();

    toggle(landingPanel);
    toggle(initialPanel);
    
    // landingPanel.classList.remove("panel--show");
    // landingPanel.classList.add("panel--hide");
    // initialPanel.classList.remove("panel--hide");
    // initialPanel.classList.add("panel--show");
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
}



