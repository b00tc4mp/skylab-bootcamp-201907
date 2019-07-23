'use strict';

var users = new Curray();

var panels = document.getElementsByClassName('panel');

// initial panel

var initialPanel = panels[0];

var registerLink = initialPanel.children[0];
var loginLink = initialPanel.children[1];

registerLink.addEventListener('click', function (event) {
    debugger;
    event.preventDefault();

    initialPanel.classList.remove('panel--show');
    initialPanel.classList.add('panel--hide');

    registerPanel.classList.remove('panel--hide');
    registerPanel.classList.add('panel--show');
});

loginLink.addEventListener('click', function (event) {
    event.preventDefault();

    initialPanel.classList.remove('panel--show');
    initialPanel.classList.add('panel--hide');

    loginPanel.classList.remove('panel--hide');
    loginPanel.classList.add('panel--show');
});

// register panel

var registerPanel = panels[1];

var registerBackLink = registerPanel.children[1];

registerBackLink.addEventListener('click', function (event) {
    event.preventDefault();

    registerPanel.classList.remove('panel--show');
    registerPanel.classList.add('panel--hide');

    initialPanel.classList.remove('panel--hide');
    initialPanel.classList.add('panel--show');
});

var registerForm = registerPanel.children[0];


function registerUser(user){
    users.push(user);

    registerPanel.classList.remove('panel--show');
    registerPanel.classList.add('panel--hide');

    registerSuccessPanel.classList.remove('panel--hide');
    registerSuccessPanel.classList.add('panel--show');

}

registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var name = event.target.name.value;
    var surname = event.target.surname.value;
    var email = event.target.email.value;
    var password = event.target.password.value;
debugger;
    // TODO validation rules!
    
    if (name == "" || surname == "" || email == "" || password == ""){
        debugger;
        registerPanel.children[2].classList.remove("letter--hide")
        registerPanel.children[2].classList.add("letter--show")
        alert("Not credential");
    
    }else{
        if(users){
            for(var i =0; i<users.length; i++){
                if(name == users[i].name || surname == users[i].surname|| email == users[i].email){
                    alert("This user o email exist")
                }else{
                    registerUser({
                        name: name,
                        surname: surname,
                        email: email,
                        password: password
                        });
                }
            }
            
        }else{
            registerUser({
                name: name,
                surname: surname,
                email: email,
                password: password
                });

            
        }
    }
             
});

// register success panel

var registerSuccessPanel = panels[2];

var registerSuccessLoginLink = registerSuccessPanel.children[0];

registerSuccessPanel.addEventListener('click', function (event) {
    event.preventDefault();

    registerSuccessPanel.classList.remove('panel--show');
    registerSuccessPanel.classList.add('panel--hide');

    loginPanel.classList.remove('panel--hide');
    loginPanel.classList.add('panel--show');
});

// login panel

var loginPanel = panels[3];

var loginBackLink = loginPanel.children[1];

loginBackLink.addEventListener('click', function (event) {
    event.preventDefault();

    loginPanel.classList.remove('panel--show');
    loginPanel.classList.add('panel--hide');

    initialPanel.classList.remove('panel--hide');
    initialPanel.classList.add('panel--show');
});

var loginForm = loginPanel.children[0];

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var email = event.target.email.value;
    var password = event.target.password.value;

    // TODO validation rules!
    for(var i=0; i<users.length; i++){
        if(users[i].email == email){
            user = users[i];
            break;
        }
    }

    if(user &&  user.password == password){
        loginPanel.classList.remove('panel--show');
        loginPanel.classList.add('panel--hide');

        welcomePanel.classList.remove('panel--hide');
        welcomePanel.classList.add('panel--show');

    }else{
        window.alert("El email y/o la contraseña son incorrectas"); 
    }

            /* var user = users.find(function (user) {
                return user.email === email && user.password === password;
            });

            if (user) {
                console.log(user);

                loginPanel.classList.remove('panel--show');
                loginPanel.classList.add('panel--hide');

                welcomePanel.classList.remove('panel--hide');
                welcomePanel.classList.add('panel--show');
            } else console.error('wrong credentials'); */
});

var welcomePanel = panels[4];

