'use strict'
/**
 * All UI content here
 */

var users = new Curray()

var panels = document.getElementsByClassName('panel')
var div = document.getElementsByClassName('link')
//--------------------------------------------------------
//initial-panel
var initialPanel = panels[0];
var initialPanelChild = div[0]

var registerLink = initialPanelChild.children[0];
var loginLink = initialPanelChild.children[1];
//------------------------
registerLink.addEventListener('click', function (event) {
    resetAlerts();
    event.preventDefault();
    tooglePanels(initialPanel, registerPanel)

});
//------------------------
loginLink.addEventListener('click', function (event) {
    resetAlerts();

    event.preventDefault();
    tooglePanels(initialPanel, loginPanel)

});
//---------------------------------------------------------
//register Panel

var registerPanel = panels[1];

var registerBacklink = registerPanel.children[1];

registerBacklink.addEventListener('click', function (event) {
    event.preventDefault();

    tooglePanels(registerPanel, initialPanel)

});

//--------------------

var registerForm = registerPanel.children[0];

registerForm.addEventListener('submit', function (event) {

    event.preventDefault();

    var name = event.target.name.value;
    var surname = event.target.surname.value;
    var email = event.target.email.value;
    var password = event.target.password.value;

    try {
        register(name, surname, email, password);
        tooglePanels(registerPanel, registerSuccessPanel)

    } catch (error) {
        var alert = registerForm.children[9]
        alert.innerText = error.message
    }

});
//----------------------------------------------------------
// register sucess panel

var registerSuccessPanel = panels[2];

var successPanelLink = registerSuccessPanel.children[0];

successPanelLink.addEventListener('click', function (event) {
    event.preventDefault();

    tooglePanels(registerSuccessPanel, loginPanel)

});
//---------------------------------------------------------
// login panel

var loginPanel = panels[3];
var loginForm = loginPanel.children[0];
var alertMessage = loginForm.children[5]
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var email = event.target.email.value;
    var password = event.target.password.value;

    try {
        login(email, password)
        tooglePanels(loginPanel, welcomePanel)
    } catch (error) {
        alertMessage.innerText = error.message
    }
});
//-----------------------------
var welcomePanel = panels[4];
var p = welcomePanel.children[1]
var welcomeBackLink = welcomePanel.children[3].children[0]

welcomeBackLink.addEventListener('click', function (event) {
    event.preventDefault();
    tooglePanels(welcomePanel, initialPanel)
})

//function that toogles the panels

function tooglePanels(panelOff, panelOn) {

    panelOff.classList.remove('panel--show')
    panelOff.classList.add('panel--hide')

    panelOn.classList.remove('panel--hide')
    panelOn.classList.add('panel--show')

}