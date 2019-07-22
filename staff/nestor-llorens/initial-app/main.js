var panels = document.getElementsByClassame('panel');

var initialPanel = panels[0];

var registerLink = initialPanel.children[0];

var loginLink = initialPanel.children[1];

registerLink.addEventListener('click', function() {
    // TODO HIDE initial panel and show register panel
    initialPanel.classList.remove('panel--show');
    initialPanel.classList.remove('panel--hide');

});

var initial = document.getElementsByClassName('panel')[0];