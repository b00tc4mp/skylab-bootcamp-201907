var users = [];

var panels = document.getElementsByClassName('panel');

// initial panel

var initialPanel = panels[0];

var registerLink = initialPanel.children[0];
var loginLink = initialPanel.children[1];

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

var registerBackLink = registerPanel.children[1];

registerBackLink.addEventListener('click', function (event) {
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
    var surname = event.target.surname.value;
    var email = event.target.email.value;
    var password = event.target.password.value;

    function find() {
        debugger
        for (i=0; i< users.length; i++) {
            if (users[i].email === email) return true;
        }
        return false;
    }

    if (find() === false) {
        debugger
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
    }

    else {
        document.getElementById("error").innerHTML = 'Wrong email!';
    }
    });


var registerSuccessPanel = panels[2];

var loginPanel = panels[3];

var loginBackLink = loginPanel.children[1];

loginBackLink.addEventListener('click', function (event) {
    event.preventDefault();

    loginPanel.classList.remove('panel--show');
    loginPanel.classList.add('panel--hide');

    initialPanel.classList.remove('panel--hide');
    initialPanel.classList.add('panel--show');
});

var loginButton = registerSuccessPanel.children[0];

registerSuccessPanel.addEventListener('click', function (event) {
    event.preventDefault();

    registerSuccessPanel.classList.remove('panel--show');
    registerSuccessPanel.classList.add('panel--hide');

    loginPanel.classList.remove('panel--hide');
    loginPanel.classList.add('panel--show');
});

var loginPanelButton = loginPanel.children[0];
var landingPanel = panels[4];

loginPanelButton.addEventListener('submit', function (event) {
    event.preventDefault();

    var email = event.target.email.value;
    var password = event.target.password.value;

    users.forEach(function (item) {
        // debugger
        if (item.email === email && item.password === password) {
            loginPanel.classList.remove('panel--show');
            loginPanel.classList.add('panel--hide');

            landingPanel.classList.remove('panel--hide');
            landingPanel.classList.add('panel--show');
            document.getElementById("user").innerHTML = item.name + '!';
        }
        else alert('Wrong user and/or password!')
    });

});