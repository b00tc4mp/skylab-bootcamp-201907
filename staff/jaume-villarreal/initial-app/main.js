var panels = document.getElementsByClassName("panel");

var initialPanel = panels[0];
var registerPanel = panels[1];

var registerLink = initialPanel.children[0];
var loginLink = initialPanel.children[1];

registerLink.addEventListener('click' , function(e){
    e.preventDefault(e);
    initialPanel.classList.remove("content-box--show");
    initialPanel.classList.add("content-box--hide");
    registerPanel.classList.remove("content-box--hide");
    registerPanel.classList.add("content-box--show");
})