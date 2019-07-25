/**
 * Component abstraction.
 * 
 * @param {HTMLElement} container 
 */
function Component(container) {
    if (!(container instanceof HTMLElement)) throw new TypeError(container + ' is not an HTMLElement');

    this.container = container;
}

Component.prototype.show = function () {
    this.container.classList.remove('hide');
    this.container.classList.add('show');
};

Component.prototype.hide = function () {
    this.container.classList.remove('show');
    this.container.classList.add('hide');
};

/**
 * Landing abstraction.
 * 
 * @param {HTMLElement} container 
 */
function Landing(container) {
    Component.call(this, container);
}

Landing.prototype = Object.create(Component.prototype);
Landing.prototype.constructor = Landing;

Landing.prototype.onNavigateToRegister = function (expression) {
    var register = this.container.children[0];

    register.addEventListener('click', function (event) {
        event.preventDefault();

        expression();
    });
};

Landing.prototype.onNavigateToLogin = function (expression) {
    var login = this.container.children[1];

    login.addEventListener('click', function (event) {
        event.preventDefault();

        expression();
    });
};

/**
 * Submit Back abstraction.
 * 
 * @param {HTMLElement} container 
 */
function SubmitBack(container) {
    Component.call(this, container);

    var feedback = new Feedback(this.container.children[1]);
    feedback.hide();
    this.feedback = feedback;
}

SubmitBack.prototype = Object.create(Component.prototype);
SubmitBack.prototype.constructor = SubmitBack;

SubmitBack.prototype.onNavigateBack = function (expression) {
    var back = this.container.children[2];

    back.addEventListener('click', function (event) {
        event.preventDefault();

        expression();
    });
};

SubmitBack.prototype.showFeedback = function (message) {
    this.feedback.setMessage(message);
    this.feedback.show();
};

SubmitBack.prototype.show = function () {
    this.feedback.hide();

    //this.show(); // ERROR infinite recursion loop
    Component.prototype.show.call(this);
};

/**
 * Register abstraction.
 * 
 * @param {HTMLElement} container 
 */
function Register(container) {
    SubmitBack.call(this, container);
}

Register.prototype = Object.create(SubmitBack.prototype);
Register.prototype.constructor = Register;

Register.prototype.onSubmitRegister = function (expression) {
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

/**
 * Register Success abstraction.
 * 
 * @param {HTMLElement} container 
 */
function RegisterSuccess(container) {
    Component.call(this, container);
}

RegisterSuccess.prototype = Object.create(Component.prototype);
RegisterSuccess.prototype.constructor = RegisterSuccess;

RegisterSuccess.prototype.onNavigateToLogin = function (expression) {
    var login = this.container.children[0];

    login.addEventListener('click', function (event) {
        event.preventDefault();

        expression();
    });
};

/**
 * Login abstraction.
 * 
 * @param {HTMLElement} container 
 */
function Login(container) {
    SubmitBack.call(this, container);
}

Login.prototype = Object.create(SubmitBack.prototype);
Login.prototype.constructor = Login;

Login.prototype.onSubmitLogin = function (expression) {
    var form = this.container.children[0];

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var email = event.target.email.value;
        var password = event.target.password.value;

        expression(email, password);
    });
};

/**
 * Feedback abstraction.
 * 
 * @param {*} container 
 */
function Feedback(container) {
    Component.call(this, container);
}

Feedback.prototype = Object.create(Component.prototype);
Feedback.prototype.constructor = Feedback;

Feedback.prototype.setMessage = function (message) {
    this.container.innerText = message;
};

/**
 * Search abstraction.
 * 
 * @param {HTMLElement} container 
 */
function Search(container) {
    Component.call(this, container);
}

Search.prototype = Object.create(Component.prototype);
Search.prototype.constructor = Search;

Search.prototype.onSearch = function (expression) {
    var form = this.container.getElementsByTagName('form')[0];

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var query = form.query.value;

        expression(query);
    });
};

/**
 * Results abstraction.
 */
function Results(container) {
    Component.call(this, container);
}

Results.prototype = Object.create(Component.prototype);
Results.prototype.constructor = Results;

Results.prototype.listItems = function (items) {
    var ul = this.container.getElementsByTagName('ul')[0];
    ul.innerHTML = '';

    items.forEach(function (item) {
        var li = document.createElement('li');

        ul.appendChild(li);

        this.paintItem(li, item);
    }.bind(this)); // WATCH this
};

Results.prototype.paintItem = function(li, item) {
    li.innerText = item;
};
