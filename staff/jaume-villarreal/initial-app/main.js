// users array
var users = [];
//panels
var panels = document.getElementsByClassName("panel");

//initialPanel
var initialPanel = panels[0];
var initialBtnSet = initialPanel.children[1]

var registerLink = initialBtnSet.children[0];
var loginLink = initialBtnSet.children[1];

registerLink.addEventListener('click' , function(e){
    e.preventDefault();
    initialPanel.classList.remove("panel--show");
    initialPanel.classList.add("panel--hide");
    registerPanel.classList.remove("panel--hide");
    registerPanel.classList.add("panel--show");
})

loginLink.addEventListener("click", function(e){
    e.preventDefault();
    initialPanel.classList.remove("panel--show");
    initialPanel.classList.add("panel--hide");
    loginPanel.classList.remove("panel--hide");
    loginPanel.classList.add("panel--show");
})


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

    console.log(users);
})

backInitialLink = registerPanel.children[2];
backInitialLink.addEventListener("click" , function(e){
    e.preventDefault();
    registerPanel.classList.remove("panel--show");
    registerPanel.classList.add("panel--hide");
    initialPanel.classList.remove("panel--hide");
    initialPanel.classList.add("panel--show");
});

// successRegisterPanel
var successRegisterPanel = panels[2];

// loginPanel
var loginPanel = panels[3];

// landingPanel
var landingPanel = panels[4];



