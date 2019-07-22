/**
 * var users= where keep all the users registered.
 * var panel= all html panels.
 */

var users = [];
var actualUser = [];
var panels = document.getElementsByClassName('panel');
var alertEmail = document.getElementById(email).value;
var alertPassword = document.getElementById(password).value;


var initialPanel = panels[0]; //-------------------------Initial Panel---------------------------[0]of panels 
//option register
var registerLink = initialPanel.children[0]; //a>Register
var loginLink = initialPanel.children[1]; //a>Login

registerLink.addEventListener('click', function (event) { //child[1] of initialPanel 
    event.preventDefault();

    initialPanel.classList.remove('panel--show');
    initialPanel.classList.add('panel--hide');

    registerPanel.classList.remove('panel--hide');
    registerPanel.classList.add('panel--show');

});
//option login

loginLink.addEventListener('click', function (event) { //child[1] of initialPanel 
    event.preventDefault();

    initialPanel.classList.remove('panel--show');
    initialPanel.classList.add('panel--hide');

    loginPanel.classList.remove('panel--hide');
    loginPanel.classList.add('panel--show');

});

var registerPanel = panels[1]; //-------------------------Register Panel----------------------------[1]of panels 

// form register
var registerForm = registerPanel.children[0];

registerForm.addEventListener('submit', function (event) {
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

// option back return
var registerBackLink = registerPanel.children[1];

registerBackLink.addEventListener('click', function (event) {
    event.preventDefault();

    registerPanel.classList.remove('panel--show');
    registerPanel.classList.add('panel--hide');

    initialPanel.classList.remove('panel--hide');
    initialPanel.classList.add('panel--show');

});

var registerSuccessPanel = panels[2]; //-------------------------Success Panel----------------------------[2]of panels 

//option back return
var loginBackLink = registerSuccessPanel.children[0];

loginBackLink.addEventListener('click', function (event) {
    event.preventDefault();

    registerSuccessPanel.classList.remove('panel--show');
    registerSuccessPanel.classList.add('panel--hide');

    loginPanel.classList.remove('panel--hide');
    loginPanel.classList.add('panel--show');


});
var loginPanel = panels[3]; //-------------------------Login Panel----------------------------[3]of panels 
//form login
var loginForm = loginPanel.children[0];
var loginSuccessPanel = panels[4];

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    
    var returnEmail = event.target.email.value
    var returnPassword = event.target.password.value;

    for(prop in users){
        if (users[prop].email === returnEmail && users[prop].password === returnPassword) {actualUser.push(users[prop]); 
        }
        else if (users[prop].email !== returnEmail && users[prop].password === returnPassword) { alert('Please, enter your correct email.'); loginForm();}
        else if (users[prop].email === returnEmail && users[prop].password !== returnPassword) { alert('Please, enter your correct password.'); loginForm();}
        else if (users[prop].email !== returnEmail && users[prop].password !== returnPassword) { alert('Please, register to continue.'); loginForm();}
        else loginForm();
    


    loginPanel.classList.remove('panel--show');
    loginPanel.classList.add('panel--hide');

    loginSuccessPanel.classList.remove('panel--hide');
    loginSuccessPanel.classList.add('panel--show');}
});

/* alert(users)

function checkUser(arr, start, end) {
    if (start < end) {
        if (arr[start].email === email) alert('Hello ' + arr[start].name);
        else {

            checkUser(arr, start + 1, end);
        }
    } else alert('Welcome ');

}; 

checkUser(users,0,users.length); */
