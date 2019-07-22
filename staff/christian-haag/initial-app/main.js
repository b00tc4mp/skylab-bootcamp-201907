var users = [];

var panels = document.getElementsByClassName('panel')
var div = document.getElementsByClassName('link')
//initial-panel


var initialPanel = panels[0];
var initialPanelChild = div[0]

var registerLink = initialPanelChild.children[0];
var loginLink = initialPanelChild.children[1];

registerLink.addEventListener('click', function (event) {

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

var registerPanel = panels[1];

var registerBacklink = registerPanel.children[1];

loginLink.addEventListener('click', function (event) {
    event.preventDefault();

    registerPanel.classList.remove('panel--show');
    registerPanel.classList.add('panel--hide');

    initialPanel.classList.remove('panel--hide');
    initialPanel.classList.add('panel--show');
});

var registerForm = registerPanel.children[0];

registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var name = event.target.name.value;
    var surename = event.target.surname.value;
    var email = event.target.email.value;
    var password = event.target.password.value;

    users.push({
        name: name,
        surename: surename,
        email: email,
        password: password
    });

    registerPanel.classList.remove('panel--show');
    registerPanel.classList.add('panel--hide');

    registerSuccessPanel.classList.remove('panel--hide');
    registerSuccessPanel.classList.add('panel--show');
});

var registerSuccessPanel = panels[2];

var successPanelLink = registerSuccessPanel.children[0];

successPanelLink.addEventListener('click', function (event) {
    event.preventDefault();

    registerSuccessPanel.classList.remove('panel--show');
    registerSuccessPanel.classList.add('panel--hide');

    loginPanel.classList.remove('panel--hide');
    loginPanel.classList.add('panel--show');
});

var loginPanel = panels[3];
var loginPanelLink = loginPanel.children[0]

loginPanelLink.addEventListener('submit', function (event) {
    event.preventDefault();

    var email = event.target.email.value;
    var password = event.target.password.value;

    if (email === users[0]['email'] && password === users[0]['password']) {
        loginPanel.classList.remove('panel--show');
        loginPanel.classList.add('panel--hide');

        welcomePanel.classList.remove('panel--hide');
        welcomePanel.classList.add('panel--show');
    } else {
        alert('wrong password')
    }


});

var welcomePanel = panels[4];