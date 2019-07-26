// SOLO REMOVE Y ADD LAS ETIQUETAS SELECCIONADAS POR CLASS
// LAS OTRAS PERMANECEN IGUAL QUE ANTES
// FIND DE CURRAY
// NO USERS WITH SAME EMAIL
// foirm errors w3schiols
// function validateEmail(email) {
//     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }

// no empty string remove undefined !name.trim().length
// ajustar children
// innerText en comptes de innerHTML

var users = [];

var errorTextRegister = document.querySelector(".errorTextRegister");
var errorTextLoginEmpty = document.querySelector(".errorTextLoginEmpty");
var errorTextLoginWrong = document.querySelector(".errorTextLoginWrong");


var panels = document.getElementsByClassName("panel");

// INITIAL PANEL panels[0]

var initialPanel = panels[0];

var registerLink = initialPanel.children[0];
var loginLink = initialPanel.children[1];

registerLink.addEventListener("click", function(event) {
    event.preventDefault();

    initialPanel.classList.remove("panel--show");
    initialPanel.classList.add("panel--hide");

    registerPanel.classList.remove("panel--hide");
    registerPanel.classList.add("panel--show");
});

loginLink.addEventListener("click", function(event) {
    event.preventDefault();

    initialPanel.classList.remove("panel--show");
    initialPanel.classList.add("panel--hide");

    loginPanel.classList.remove("panel--hide");
    loginPanel.classList.add("panel--show");
});

// REGISTER PANEL panels[1]

var registerPanel = panels[1];

var registerBackLink = registerPanel.children[2];

registerBackLink.addEventListener("click", function(event) {
    event.preventDefault();

    registerPanel.classList.remove("panel--show");
    registerPanel.classList.add("panel--hide");
    
    initialPanel.classList.remove("panel--hide");
    initialPanel.classList.add("panel--show");
});

var registerForm = registerPanel.children[0];

registerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var name = event.target.name.value;
    var surname = event.target.surname.value;
    var email = event.target.email.value;
    var password = event.target.password.value;


    try {
        register(name, surname, email, password);

        registerPanel.classList.remove("panel--show");
        registerPanel.classList.add("panel--hide");
    
        registerSuccessPanel.classList.remove("panel--hide");
        registerSuccessPanel.classList.add("panel--show");
    } catch (error) {
        var registerFeedback = registerPanel.children[1];
        registerFeedback.innerTextHTML = error.message;
    }


    // if (!name.trim() == undefined || surname !== undefined || email !== undefined || password !== undefined) {

    // users.push({
    //     name: name,
    //     surname: surname,
    //     email: email,
    //     password: password
    // });

    // registerPanel.classList.remove("panel--show");
    // registerPanel.classList.add("panel--hide");
    
    // registerSuccessPanel.classList.remove("panel--hide");
    // registerSuccessPanel.classList.add("panel--show");


// } else {
//     errorTextRegister.innerHTML = "Empty fields!";
// }


});


// REGISTER SUCCESS PANEL panels[2]

var registerSuccessPanel = panels[2];

var registerSuccessLoginLink = registerSuccessPanel.children[0];

registerSuccessPanel.addEventListener("click", function(event) {
    event.preventDefault();

    registerSuccessPanel.classList.remove("panel--show");
    registerSuccessPanel.classList.add("panel--hide");

    loginPanel.classList.remove("panel--hide");
    loginPanel.classList.add("panel--show");
});

// COMPARAR EL HTML DE LOS FORMS Y LOS BACKBUTTONS
// LOGIN PANEL panels[3]

var loginPanel = panels[3];

var loginBackLink = loginPanel.children[2];

loginBackLink.addEventListener("click", function (event) {
    event.preventDefault();

    loginPanel.classList.remove("panel--show");
    loginPanel.classList.add("panel--hide");

    initialPanel.classList.remove("panel--hide");
    initialPanel.classList.add("panel--show");
});

var loginForm = loginPanel.children[0];

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var email = event.target.email.value;
    var password = event.target.password.value;

    try {
        login(email, password);

        loginPanel.classList.remove("panel--show");
        loginPanel.classList.add("panel--hide");

        welcomePanel.classList.remove("panel--hide");
        welcomePanel.classList.add("panel--show");
    } catch(error) {
        var loginFeedback = loginPanel.children[1];

        loginFeedback.innerText = error.message;
    }
});
 

// WELCOME PANEL panels[4]


var welcomePanel = panels[4];

var welcomeBackLink = welcomePanel.children[0];

welcomeBackLink.addEventListener("click", function(event) {
    event.preventDefault();

    

    welcomePanel.classList.remove("panel--show");
    welcmePanel.classList.add("panel--hide");
    
    initialPanel.classList.remove("panel--hide");
    initialPanel.classList.add("panel--show");
});