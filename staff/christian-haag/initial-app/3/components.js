'use strict'

/**
 * 
 * Component abstraction
 * 
 * @param {HTMLElement} container 
 */

function Component(container) {
    if (!(container instanceof HTMLElement)) throw new TypeError(container + ' is not an HTMLElement')

    this.container = container;
}

/**
 *Panel abstraction 
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
    this.container.classList.add('panel--hide')
};

/**
 * Initial Panel abstraction
 * 
 * @param {HTMLElement} container 
 */

function InitialPanel(container) {
    Panel.call(this, container);
}

InitialPanel.prototype = Object.create(Panel.prototype);
InitialPanel.prototype.constructor = InitialPanel;

InitialPanel.prototype.onNavigateToRegister = function (expression) {
    var registerLink = this.container.children[0].children[0];

    registerLink.addEventListener('click', function (event) {
        event.preventDefault();
        expression();
    });

};

InitialPanel.prototype.onNavigateToLogin = function (expression) {
    var loginLink = this.container.children[0].children[1];

    loginLink.addEventListener('click', function (event) {
        event.preventDefault();
        expression();
    });

};


/**
 * 
 * Register Panel abstraction
 * 
 * @param {HTMLElement} container 
 */


function SubmitBackPanel(container) {
    Panel.call(this, container);

    var feedBackPanel = new FeedBackPanel(this.container.children[1]);

    feedBackPanel.hide();
    this.feedback = feedBackPanel;
};

SubmitBackPanel.prototype = Object.create(Panel.prototype);
SubmitBackPanel.prototype.constructor = SubmitBackPanel;

SubmitBackPanel.prototype.onNavigateBack = function (expression) {
    var backLink = this.container.children[2];

    backLink.addEventListener('submit', function (event) {
        event.preventDefault();
        expression();
    });
};

SubmitBackPanel.prototype.showFeedBack = function (message) {
    this.feedback.setMessage(message);
    this.feedback.show();
};

SubmitBackPanel.prototype.show = function () {
    this.feedback.hide();

    Panel.prototype.show.call(this);
};



function RegisterPanel(container) {
    SubmitBackPanel.call(this, container);
}

RegisterPanel.prototype = Object.create(SubmitBackPanel.prototype);
RegisterPanel.prototype.constructor = RegisterPanel;

RegisterPanel.prototype.onSubmitRegister = function (expression) {
    var form = this.container.children[0];

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var name = event.target.name.value;
        var surname = event.target.surname.value;
        var email = event.target.email.value;
        var password = event.target.password.value;

        expression(name, surname, email, password);
    });
};

// RegisterPanel.prototype.onRegisterSubmit = function (expression) {
//     var registerForm = this.container.children[0];

//     registerForm.addEventListener('submit', expression);
// };

// RegisterPanel.prototype.showFeedBack = function (message) {
//     var registerFeedback = registerPanel.container.children[0].lastElementChild
//     registerFeedback.innerText = message
// }

/**
 * 
 *
//  * Register success Panel abstraction
//  *
//  * @param {HTMLElement} container
//  */
function RegisterSuccessPanel(container) {
    Panel.call(this, container)

}

RegisterSuccessPanel.prototype = Object.create(Panel.prototype);
RegisterSuccessPanel.prototype.constructor = RegisterSuccessPanel;

RegisterSuccessPanel.prototype.onNavigateToLogin = function (expression) {
    var loginLink = this.container.children[0]

    loginLink.addEventListener('click', function (event) {
        event.preventDefault();

        expression();
    });
}

// /**
//  * 
//  * Login Panel abstraction
//  * 
//  * @param {HTMLElement} container 
//  */
function LoginPanel(container) {
    SubmitBackPanel.call(this, container)
};

LoginPanel.prototype = Object.create(SubmitBackPanel.prototype);
LoginPanel.prototype.constructor = LoginPanel;

LoginPanel.prototype.onSubmitLogin = function (expression) {
    var form = this.container.children[0];

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var email = event.target.email.value;
        var password = event.target.password.value;

        expression(email, password);
    });

}

function WelcomePanel(container) {
    Panel.call(this, container)
};

WelcomePanel.prototype = Object.create(Panel.prototype);
WelcomePanel.prototype.constructor = WelcomePanel;

WelcomePanel.prototype.onClickLogout = function (expression) {
    var logoutButton = this.container.children[2]

    logoutButton.addEventListener('click', function (event) {
        event.preventDefault();
        expression();
    });
}

function FeedBackPanel(container) {
    Panel.call(this, container);
};

FeedBackPanel.prototype = Object.create(Panel.prototype);
FeedBackPanel.prototype.constructor = FeedBackPanel;

FeedBackPanel.prototype.setMessage = function (message) {
    this.container.innerText = message;
}