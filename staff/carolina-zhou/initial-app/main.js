var users = [{
        email: "carol.z.lin.95@gmail.com",
        name: "Carolina",
        password: "123456",
        surname: "Zhou"
}];
var panels = document.getElementsByClassName('panel');

// initial panel
var initialPanel = panels[0];
var registerLink = document.getElementsByClassName('intro__register')[0];
var loginLink = document.getElementsByClassName('intro__login')[0];

registerLink.addEventListener('click', function(event) {
    event.preventDefault();

    initialPanel.classList.remove('panel--show');
    initialPanel.classList.add('panel--hide');

    registerPanel.classList.remove('panel--hide');
    registerPanel.classList.add('panel--show');
});

loginLink.addEventListener('click', function(event) {
    event.preventDefault();

    initialPanel.classList.remove('panel--show');
    initialPanel.classList.add('panel--hide');

    loginPanel.classList.remove('panel--hide');
    loginPanel.classList.add('panel--show');
});

// register process panel
var registerPanel = panels[1];
var registerBackLink = document.getElementsByClassName('register__back')[0];

registerBackLink.addEventListener('click', function(event) {
    event.preventDefault();

    registerPanel.classList.remove('panel--show');
    registerPanel.classList.add('panel--hide');
    
    initialPanel.classList.remove('panel--hide');
    initialPanel.classList.add('panel--show');
});

var registerForm = registerPanel.children[0];

registerForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var name = event.target.name.value;
    var surname = event.target.surname.value;
    var email = event.target.email.value;
    var password = event.target.password.value; 

    for(i = 0; i < users.length; i++) {
        if(email !== users[i].email) {
        
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
        } else {
            alert("There is already an account with the provided email address");
        }
    }
});

// register confirmation panel
var registerSuccessPanel = panels[2];
var confirmationForm = registerSuccessPanel.children[0];

confirmationForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var firstLog = document.getElementById("finalPass").value;

        if (firstLog === users[users.length-1].password) {
            registerSuccessPanel.classList.remove('panel--show');
            registerSuccessPanel.classList.add('panel--hide');
            
            homePanel.classList.remove('panel--hide');
            homePanel.classList.add('panel--show');
        } else {
            alert("Wrong password. Try again.");
        }
});

// login panel
var loginPanel = panels[3];
var loginForm = loginPanel.children[0];

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById("userEmail").value;
    var password = document.getElementById("userPassword").value;

    for (i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
            loginPanel.classList.remove('panel--show');
            loginPanel.classList.add('panel--hide');
            
            homePanel.classList.remove('panel--hide');
            homePanel.classList.add('panel--show');
        } else {
            alert("Wrong email or wrong password.")
        }
    }
});

// home panel
var homePanel = panels[4];
