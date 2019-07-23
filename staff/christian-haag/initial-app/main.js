var users = new Curray()

var panels = document.getElementsByClassName('panel')
var div = document.getElementsByClassName('link')
//initial-panel


var initialPanel = panels[0];
var initialPanelChild = div[0]

var registerLink = initialPanelChild.children[0];
var loginLink = initialPanelChild.children[1];

registerLink.addEventListener('click', function (event) {

    event.preventDefault();
    tooglePanels(initialPanel, registerPanel)

});

loginLink.addEventListener('click', function (event) {

    event.preventDefault();
    tooglePanels(initialPanel, loginPanel)

});

var registerPanel = panels[1];

var registerBacklink = registerPanel.children[1];

loginLink.addEventListener('click', function (event) {
    event.preventDefault();

    tooglePanels(registerPanel, initialPanel)

});

var registerForm = registerPanel.children[0];
var alertEmail = registerPanel.children[0].children[9]

registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var found = users.find(function (element) {
        return element.email === registerForm.email.value
    });

    var name = event.target.name.value;
    var surename = event.target.surname.value;
    var email = event.target.email.value;
    var password = event.target.password.value;

    if (found === undefined || users.length === 0) {
        users.push({
            name: name,
            surename: surename,
            email: email,
            password: password
        });
        tooglePanels(registerPanel, registerSuccessPanel)


    } else {
        alertEmail.innerText = 'Email already exists!'
    }
    registerForm.reset()
});

var registerSuccessPanel = panels[2];

var successPanelLink = registerSuccessPanel.children[0];

successPanelLink.addEventListener('click', function (event) {
    event.preventDefault();

    tooglePanels(registerSuccessPanel, loginPanel)

});

var loginPanel = panels[3];
var loginPanelLink = loginPanel.children[0];
var alertMessage = loginPanel.children[0].children[5]

loginPanelLink.addEventListener('submit', function (event) {
    event.preventDefault();

    var email = event.target.email.value;
    var password = event.target.password.value;

    if (email === users[0]['email'] && password === users[0]['password']) {

        tooglePanels(loginPanel, welcomePanel)
        p.innerText = users[0]['name'];

    } else {
        alertMessage.innerText = 'Wrong credentials, try again!'
    }

    loginPanelLink.reset()
});

var welcomePanel = panels[4];
var p = welcomePanel.children[1]
var welcomeBackLink = welcomePanel.children[3].children[0]

welcomeBackLink.addEventListener('click', function (event) {
    event.preventDefault();

    tooglePanels(welcomePanel, initialPanel)

})

function checkUser() {
    var found = arr.find(function (element) {
        return element.a === user
    })
    if (found === undefined) {
        console.log('pushed')
    } else {
        console.log('email already exists')
    }
}

function tooglePanels(panelOff, panelOn) {

    panelOff.classList.remove('panel--show')
    panelOff.classList.add('panel--hide')

    panelOn.classList.remove('panel--hide')
    panelOn.classList.add('panel--show')

}