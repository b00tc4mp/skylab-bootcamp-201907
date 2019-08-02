var users = [];

var panels = document.getElementsByClassName('panel');

// initial panel

var initialPanel = panels[0];

var registerLink = initialPanel.children[0];
var loginLink = initialPanel.children[1];
var backRegisterPanel = panels[1].children[1]


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

var registerPanel = panels[1];


var registerBackLink = registerPanel.children[1];

backRegisterPanel.addEventListener('click', function(event) {
    event.preventDefault();

    registerPanel.classList.remove('panel--show');
    registerPanel.classList.add('panel--hide');
    
    initialPanel.classList.remove('panel--hide');
    initialPanel.classList.add('panel--show');
});

registerBackLink.addEventListener('click', function(event) {
    event.preventDefault();

    registerPanel.classList.remove('panel--show');
    registerPanel.classList.add('panel--hide');
    
    initialPanel.classList.remove('panel--hide');
    initialPanel.classList.add('panel--show');
});

var registerForm = registerPanel.children[0];

var backLoginPanel = panels[3].children[1];

backLoginPanel.addEventListener('click', function(event) {
    event.preventDefault();

    loginPanel.classList.remove('panel--show');
    loginPanel.classList.add('panel--hide');
    
    initialPanel.classList.remove('panel--hide');
    initialPanel.classList.add('panel--show');
});

registerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    debugger;

    var name = event.target.name.value;
    var surname = event.target.surname.value;
    var email = event.target.email.value;
    var password = event.target.password.value;

    //if name.value == "" --> Ask again
    if (name == "" || surname == "" || email == "" || password == ""){
        window.alert("Please enter all the information"); 
    }else{
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
    }
    
});



var returnLogin = panels[2].children[0];
returnLogin.addEventListener('click', function(event) {
    event.preventDefault();

    registerSuccessPanel.classList.remove('panel--show');
    registerSuccessPanel.classList.add('panel--hide');

    loginPanel.classList.remove('panel--hide');
    loginPanel.classList.add('panel--show');
});



var registerSuccessPanel = panels[2];


var loginPanel = panels[3];
var aux = panels[3].children[0]
 // es necesario este paso?
var logButton = aux.children[4];
var welcomePanel = panels[4];


logButton.addEventListener('click', function(event) {
    event.preventDefault();
    debugger;
    var emailLogin = document.getElementById('email2').value; 
    var passwordLogin = document.getElementById('password2').value; 
    var user = {};
    for(var i=0; i<users.length; i++){
        if(users[i].email == emailLogin){
            user = users[i];
            break;
        }
    }

    if(user &&  user.password == passwordLogin){
        loginPanel.classList.remove('panel--show');
        loginPanel.classList.add('panel--hide');

        welcomePanel.classList.remove('panel--hide');
        welcomePanel.classList.add('panel--show');

    }else{
        window.alert("El email y/o la contraseña son incorrectas"); 
    }


});