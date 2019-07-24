/**
 * Component abstraction.
 *  
 * @param {HTMLElement} container 
 */
function Component(container) {
    if (!(container instanceof HTMLElement)) throw new TypeError(container + ' is not an HTMLElement');

    this.container = container;
}














/**
 * Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */
function Panel(container) {
    Component.call(this, container);
}

Panel.prototype = Object.create(Component.prototype);
Panel.prototype.constructor = Panel;

Panel.prototype.show = function () {
    this.container.classList.remove('panel--hide');
    this.container.classList.add('panel--show');
};

Panel.prototype.hide = function () {
    this.container.classList.remove('panel--show');
    this.container.classList.add('panel--hide');
};















/**
 * Initial Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */
function InitialPanel(container) {
    Panel.call(this, container);
}

InitialPanel.prototype = Object.create(Panel.prototype);
InitialPanel.prototype.constructor = InitialPanel;

InitialPanel.prototype.onNavigateToRegister = function (expression) {
    var registerLink = this.container.children[0];

    registerLink.addEventListener('click', function (event) {
        event.preventDefault();

        expression();
    });
};

InitialPanel.prototype.onNavigateToLogin = function (expression) {
    var loginLink = this.container.children[1];

    loginLink.addEventListener('click', function (event) {
        event.preventDefault();

        expression();
    });
};















/**
 * Submit Back Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */
function SubmitBackPanel(container) {
    Panel.call(this, container);

    var feedbackPanel = new FeedbackPanel(this.container.children[1]);
    feedbackPanel.hide();
    this.feedback = feedbackPanel;
}

SubmitBackPanel.prototype = Object.create(Panel.prototype);
SubmitBackPanel.prototype.constructor = SubmitBackPanel;

SubmitBackPanel.prototype.onNavigateBack = function (expression) {
    var backLink = this.container.children[2];

    backLink.addEventListener('click', function (event) {
        event.preventDefault();

        expression();
    });
};

SubmitBackPanel.prototype.showFeedback = function (message) {
    this.feedback.setMessage(message);
    this.feedback.show();
};

SubmitBackPanel.prototype.show = function() {
    this.feedback.hide();

    //this.show(); // ERROR infinite recursion loop
    Panel.prototype.show.call(this);
};












/**
 * Register Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */

function RegisterPanel(container) {
    SubmitBackPanel.call(this, container);
}

RegisterPanel.prototype = Object.create(Panel.prototype);
RegisterPanel.prototype.constructor = RegisterPanel;

RegisterPanel.prototype.onRegisterSubmit = function (expression) {
    var registerForm = this.container.children[0];

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        var name = event.target.name.value;
        var surname = event.target.surname.value;
        var email = event.target.email.value;
        var password = event.target.password.value;
        var status = 0;

        expression(name, surname, email, password, status);
    });
};




















/**
 * Register Success abstraction.
 * 
 * @param {HTMLElement} container 
 */

function RegisterSuccessPanel(container) {
    Panel.call(this, container);
}

RegisterSuccessPanel.prototype = Object.create(Panel.prototype);
RegisterSuccessPanel.prototype.constructor = RegisterSuccessPanel;

RegisterSuccessPanel.prototype.onNavigateToLogin = function (expression) {
    var loginLink = this.container.children[0];

    loginLink.addEventListener('click', function (event) {
            event.preventDefeult();

            expression();
    });
};




















/**
 * Login Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */

function LoginPanel(container) {
    Panel.call(this, container);
}

LoginPanel.prototype = Object.create(Panel.prototype);
LoginPanel.prototype.constructor = LoginPanel;

LoginPanel.prototype.onLoginSubmit = function (expression) {
    var loginForm = this.container.children[0];

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        var email = event.target.email.value;
        var password = event.target.password.value;

        expression(email, password);
    });
};


 

/**
 * Welcome Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */

function WelcomePanel(container) {
    Panel.call(this, container);
}

WelcomePanel.prototype = Object.create(Panel.prototype);
WelcomePanel.prototype.constructor = WelcomePanel;


WelcomePanel.prototype.onLogoutPush = function (expression) {
    var logoutButton = this.container.children[1];

    logoutButton.addEventListener('click', function (event) {
event.preventDefault();

        expression();
    });
};



// NO NEED

/**
 * Error Register Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */

function ErrorRegisterPanel(container) {
    Panel.call(this, container);
}

ErrorRegisterPanel.prototype = Object.create(Panel.prototype);
ErrorRegisterPanel.prototype.constructor = ErrorRegisterPanel;

ErrorRegisterPanel.prototype.onNavigateBack = function (expression) {
    var errorRegisterPanelBackLink = this.container.children[1];

    errorRegisterPanelBackLink.addEventListener('click', expression);
};


