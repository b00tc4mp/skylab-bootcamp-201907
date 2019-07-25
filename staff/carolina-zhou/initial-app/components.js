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
    var registerLink = document.getElementsByClassName('intro__register')[0];

    registerLink.addEventListener('click', function (event) {
        event.preventDefault();

        expression();
    });
};

InitialPanel.prototype.onNavigateToLogin = function (expression) {
    var loginLink = document.getElementsByClassName('intro__login')[0];

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

    /* var feedbackPanel = new FeedbackPanel(document.getElementsByClassName("feedback")[0]);
    feedbackPanel.hide();
    this.feedback = feedbackPanel; */
}

SubmitBackPanel.prototype = Object.create(Panel.prototype);
SubmitBackPanel.prototype.constructor = SubmitBackPanel;

SubmitBackPanel.prototype.onNavigateBack = function (expression) {
    var backLink = this.container.children[0].children[1];

    backLink.addEventListener('click', function (event) {
        event.preventDefault();

        expression();
    });
};

/* SubmitBackPanel.prototype.showFeedback = function (message) {
    this.feedback.setMessage(message);
    this.feedback.show();
};

SubmitBackPanel.prototype.show = function() {
    this.feedback.hide();
    //this.show(); // ERROR infinite recursion loop
    Panel.prototype.show.call(this);
}; */

/**
 * Register Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */
function RegisterPanel(container) {
    SubmitBackPanel.call(this, container);
}

RegisterPanel.prototype = Object.create(SubmitBackPanel.prototype);
RegisterPanel.prototype.constructor = RegisterPanel;

RegisterPanel.prototype.onRegisterSubmit = function (expression) {
    var registerForm = this.container.children[0];

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        var name = event.target.name.value;
        var surname = event.target.surname.value;
        var email = event.target.email.value;
        var password = event.target.password.value;

        expression(name, surname, email, password);
    });
};

/**
 * Register-success Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */
function RegisterSuccessPanel(container) {
    Panel.call(this, container);
}

RegisterSuccessPanel.prototype = Object.create(Panel.prototype);
RegisterSuccessPanel.prototype.constructor = RegisterSuccessPanel;

RegisterSuccessPanel.prototype.firstLog = function (expression) {
    var confirmationForm = this.container.children[0];

    confirmationForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var password = document.getElementById("finalPass").value;

        expression(password);
    });
};


/**
 * Login Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */
function LoginPanel(container) {
    SubmitBackPanel.call(this, container);
}

LoginPanel.prototype = Object.create(SubmitBackPanel.prototype);
LoginPanel.prototype.constructor = LoginPanel;

LoginPanel.prototype.onLoginSubmit = function (expression) {
    var loginForm = this.container.children[0];

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        var email = document.getElementById("userEmail").value;
        var password = document.getElementById("userPassword").value;
        
        expression(email, password);
    });
};

/**
 * Home Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */
function HomePanel(container) {
    Panel.call(this, container);
}

HomePanel.prototype = Object.create(Panel.prototype);
HomePanel.prototype.constructor = HomePanel;

HomePanel.prototype.onClickLogout = function (expression) {
    var logoutButton = document.getElementsByClassName('home__logout')[0];

    logoutButton.addEventListener('click', function (event) {
        event.preventDefault();

        expression();
    });
};

HomePanel.prototype.onSearch = function (expression) {
    var searchForm = document.getElementsByClassName("home__form")[0];

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();

        var query = document.getElementsByClassName("home__input")[0].value;
        
        expression(query);
    });
};


/**
 * Feedback Panel abstraction.
 * 
 * @param {*} container 
 */
/* function FeedbackPanel(container) {
    Panel.call(this, container);
}

FeedbackPanel.prototype = Object.create(Panel.prototype);
FeedbackPanel.prototype.constructor = FeedbackPanel;

FeedbackPanel.prototype.setMessage = function(message) {
    this.container.innerText = message;
};
 */

/**
 * Error Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */
function ErrorPanel(container) {
    Panel.call(this, container);
}

ErrorPanel.prototype = Object.create(Panel.prototype);
ErrorPanel.prototype.constructor = ErrorPanel;

ErrorPanel.prototype.showErrorMessage = function (error) {
    document.getElementsByClassName("error__message")[0].innerHTML = error; 
};


/**
 * Search Panel abstraction.
 * 
 * @param {HTMLElement} container 
 */
function SearchPanel(container) {
    Panel.call(this, container);
}

SearchPanel.prototype = Object.create(Panel.prototype);
SearchPanel.prototype.constructor = SearchPanel;