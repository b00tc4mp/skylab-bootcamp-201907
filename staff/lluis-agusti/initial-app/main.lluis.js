// TODO EN MEMORIA
// OBJETOS
// addEventListener

var panels = document.getElementsByClassName("panel");

var initialPanel = panels[0];

var registerLink = initial.children[0];
var loginLink = initial.children[1];

registerLink.addEventListener('click', function(event) {
    event.preventDefeult();

    initialPanel.classList.remove("panel--show");
    initialPanel.classList.add("panel--hide");

    registerPanel.classList.remove("panel--hide");
    registerPanel.classList.add("panel--show");
});

loginLink.addEventListener('click', function(event) {
    event.preventDefeult();

    initialPanel.classList.remove("panel--show");
    initialPanel.classList.add("panel--hide");

    registerPanel.classList.remove("panel--hide");
    registerPanel.classList.add("panel--show");
});


var registerPanel = panels[1];

var registerBackLink = registerPanel.children[1];

registerBackLink.addEventListener('click', function(event) {
    event.preventDefeult();

    initialPanel.classList.remove("panel--show");
    initialPanel.classList.add("panel--hide");

    registerPanel.classList.remove("panel--hide");
    registerPanel.classList.add("panel--show");
});

var logginPanel = panels[3];