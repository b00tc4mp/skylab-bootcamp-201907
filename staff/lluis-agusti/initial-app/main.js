// SOLO REMOVE Y ADD LAS ETIQUETAS SELECCIONADAS POR CLASS
// LAS OTRAS PERMANECEN IGUAL QUE ANTES
// FIND DE CURRAY
// NO USERS WITH SAME EMAIL
// foirm errors w3schiols
// function validateEmail(email) {
//     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }

var users = [];

var errorTextRegister = document.querySelector(".errorTextRegister");
var errorTextLoginEmpty = document.querySelector(".errorTextLoginEmpty");
var errorTextLoginWrong = document.querySelector(".errorTextLoginWrong");


var panels = document.getElementsByClassName('panel');

// INITIAL PANEL panels[0]

var initialPanel = panels[0];

var registerLink = initialPanel.children[0];
var loginLink = initialPanel.children[1];

registerLink.addEventListener('click', function(event) {
    event.preventDefault();

    initialPanel.classList.remove('panel--show');
    initialPanel.classList.add('panel--hide');

    registerPanel.classList.remove('panel--hide');
    registerPanel.classList.add('panel--show');
});

loginLink.addEventListener('click', function(event) {
    event.preventDefault();

    initialPanel.classList.remove('panel--show');
    initialPanel.classList.add('panel--hide');

    loginPanel.classList.remove('panel--hide');
    loginPanel.classList.add('panel--show');
});

// REGISTER PANEL panels[1]

var registerPanel = panels[1];

var registerBackLink = registerPanel.children[1];

registerBackLink.addEventListener('click', function(event) {
    event.preventDefault();

    registerPanel.classList.remove('panel--show');
    registerPanel.classList.add('panel--hide');
    
    initialPanel.classList.remove('panel--hide');
    initialPanel.classList.add('panel--show');
});

var registerForm = registerPanel.children[0];

registerForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var name = event.target.name.value;
    var surname = event.target.surname.value;
    var email = event.target.email.value;
    var password = event.target.password.value;

    if (name !== undefined || surname !== undefined || email !== undefined || password !== undefined) {

    users.push({
        name: name,
        surname: surname,
        email: email,
        password: password
    });

    registerPanel.classList.remove('panel--show');
    registerPanel.classList.add('panel--hide');
    
    registerSuccessPanel.classList.remove('panel--hide');
    registerSuccessPanel.classList.add('panel--show');


} else {
    errorTextRegister.innerHTML = "Empty fields!";
}


});


// REGISTER SUCCESS PANEL panels[2]

var registerSuccessPanel = panels[2];

var loginLinkTwo = registerSuccessPanel.children[0];

loginLinkTwo.addEventListener('click', function(event) {
    event.preventDefault();

    registerSuccessPanel.classList.remove('panel--show');
    registerSuccessPanel.classList.add('panel--hide');

    loginPanel.classList.remove('panel--hide');
    loginPanel.classList.add('panel--show');
});



// LOGIN PANEL panels[3]

var loginPanel = panels[3];

var loginForm = loginPanel.children[0];

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var email = event.target.email.value;
    var password = event.target.password.value;

if (email !== undefined || password !== undefined) {

    for (var i = 0; i < users.length; i++) {
        
        if (users[i].email === email && users[i].password === password) {
    
            loginPanel.classList.remove('panel--show');
            loginPanel.classList.add('panel--hide');
            
            welcomePanel.classList.remove('panel--hide');
            welcomePanel.classList.add('panel--show');
            
        } errorTextLoginWrong.innerHTML = "Wrong login information!";
        
    }
} errorTextLoginEmpty.innerHTML = "Empty fields!";
});
 

// WELCOME PANEL panels[4]


var welcomePanel = panels[4];

var welcomeBackLink = welcomePanel.children[0];

welcomeBackLink.addEventListener('click', function(event) {
    event.preventDefault();

    

    welcomePanel.classList.remove('panel--show');
    welcmePanel.classList.add('panel--hide');
    
    initialPanel.classList.remove('panel--hide');
    initialPanel.classList.add('panel--show');
});