//initial-panel
var panels = document.getElementsByClassName('panel')

var initialPanel = panels[0];
var registerPanel = panels[1];

var registerLink = initialPanel.children[0];
var loginLink = initialPanel.children[1];

registerLink.addEventListener('click', function (event) {

    event.preventDefault();

    initialPanel.classList.remove('panel--show');
    initialPanel.classList.add('panel--hide');

    registerPanel.classList.remove('panel--hide');
    registerPanel.classList.add('panel--show');
});


var registerBacklink = initial.children