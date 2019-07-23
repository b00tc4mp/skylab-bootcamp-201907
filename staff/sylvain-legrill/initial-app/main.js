var users = [];



var panels = document.getElementsByClassName('panel');

// initial panel

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

//Move to Register

var registerPanel = panels[1];


//Back Link


var registerBackLink = registerPanel.children[1];

registerBackLink.addEventListener('click', function(event) {
    event.preventDefault();

    registerPanel.classList.remove('panel--show');
    registerPanel.classList.add('panel--hide');
    
    initialPanel.classList.remove('panel--hide');
    initialPanel.classList.add('panel--show');
});

//Register panel 

var registerForm = registerPanel.children[0];

registerForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var name = event.target.name.value;
    var surname = event.target.surname.value;
    var email = event.target.email.value;
    var password = event.target.password.value;

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
});


var registerSuccessPanel = panels[2];

var loginPanel = panels[3];


//


// Move from Success Register to Login

registerSuccessPanel.addEventListener('click', function(event) {
    event.preventDefault();

    registerSuccessPanel.classList.remove('panel--show');
    registerSuccessPanel.classList.add('panel--hide');

    loginPanel.classList.remove('panel--hide');
    loginPanel.classList.add('panel--show');
});

//Login Back Link


var loginBackLink = loginPanel.children[1];

loginBackLink.addEventListener('click', function(event) {
    event.preventDefault();

    loginPanel.classList.remove('panel--show');
    loginPanel.classList.add('panel--hide');
    
    initialPanel.classList.remove('panel--hide');
    initialPanel.classList.add('panel--show');
});




// Login to Welcome!



loginPanel.addEventListener('submit', function(event){
    event.preventDefault();

    var loginSuccessPanel = panels[4];

    var email = event.target.email.value;
    var password = event.target.password.value;

   
    for (var i=0; users.length; i++){

        
        if (users[i].email === email && users[i].password === password){

            loginPanel.classList.remove('panel--show');
            loginPanel.classList.add('panel--hide');

            loginSuccessPanel.classList.remove('panel--hide');
            loginSuccessPanel.classList.add('panel--show');
        }
        else{
            window.alert("Your email or password is wrong")
        }
    }
    

});

//Backlink Success Login

var loginSuccessBackLink = loginSuccessPanel.children[1];

loginSuccessBackLink.addEventListener('click', function(event) {
    event.preventDefault();

    loginSuccessBackLink.classList.remove('panel--show');
    loginSuccessBackLink.classList.add('panel--hide');
    
    initialPanel.classList.remove('panel--hide');
    initialPanel.classList.add('panel--show');
});


// Register before login

var registerBeforLogin = loginPanel.children[2];



