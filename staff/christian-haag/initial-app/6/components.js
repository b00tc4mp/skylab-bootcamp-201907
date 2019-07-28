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

Component.prototype.show = function () {
    this.container.classList.remove('hide');
    this.container.classList.add('show');
};

Component.prototype.hide = function () {
    this.container.classList.remove('show')
    this.container.classList.add('hide')
};

/**
 * Landing abstraction
 * 
 * @param {HTMLElement} container 
 */

function Landing(container) {
    Component.call(this, container);
}

Landing.prototype = Object.create(Component.prototype);
Landing.prototype.constructor = Landing;

Landing.prototype.onNavigateToRegister = function (expression) {
    var registerLink = this.container.children[0].children[0];

    registerLink.addEventListener('click', function (event) {
        event.preventDefault();
        expression();
    });

};

Landing.prototype.onNavigateToLogin = function (expression) {
    var loginLink = this.container.children[0].children[1];

    loginLink.addEventListener('click', function (event) {
        event.preventDefault();
        expression();
    });

};


/**
 * 
 * Submit Back abstraction.
 * 
 * @param {HTMLElement} container 
 */


function SubmitBack(container) {
    Component.call(this, container);

    var feedBack = new FeedBack(this.container.children[1]);
    feedBack.hide();
    this.feedback = feedBack;
};

SubmitBack.prototype = Object.create(Component.prototype);
SubmitBack.prototype.constructor = SubmitBack;

SubmitBack.prototype.onNavigateBack = function (expression) {
    var backLink = this.container.children[2];

    backLink.addEventListener('click', function (event) {
        event.preventDefault();
        expression();
    });
};


SubmitBack.prototype.showFeedBack = function (message) {
    this.feedback.setMessage(message);
    this.feedback.show();
};

SubmitBack.prototype.show = function () {
    this.feedback.hide();

    Component.prototype.show.call(this);
};



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
 * 
 *
//  * Register success Panel abstraction
//  *
//  * @param {HTMLElement} container
//  */
function RegisterSuccess(container) {
    Component.call(this, container)

}

RegisterSuccess.prototype = Object.create(Component.prototype);
RegisterSuccess.prototype.constructor = RegisterSuccess;

RegisterSuccess.prototype.onNavigateToLogin = function (expression) {
    var loginLink = this.container.children[0]

    loginLink.addEventListener('click', function (event) {
        event.preventDefault();

        expression();
    });
}

/**
//  * Login Panel abstraction
//  * 
//  * @param {HTMLElement} container 
//  */

function Login(container) {
    SubmitBack.call(this, container)
};

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

}
/**
 * Feedback abstraction.
 * @param {*} container 
 */

function FeedBack(container) {
    Component.call(this, container);
};

FeedBack.prototype = Object.create(Component.prototype);
FeedBack.prototype.constructor = FeedBack;

FeedBack.prototype.setMessage = function (message) {
    this.container.innerText = message;
}

/**
 * Search abstraction.
 * 
 * @param {*} container 
 */

function Search(container) {
    Component.call(this, container)
}

Search.prototype = Object.create(Component.prototype);
Search.prototype.constructor = Search;

Search.prototype.onSearch = function (expression) {
    var form = this.container.children[0]

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var query = form.query.value;

        expression(query);
    });
};

// Search.prototype.refreshProducts = function (expression) {
//     var refreshButton = this.container.children[1].children[1].children[1]

//     refreshButton.addEventListener('click', function (event) {
//         event.preventDefault();
//         expression();
//     })
// }

function Results(container) {
    Component.call(this, container);

};

Results.prototype = Object.create(Component.prototype);
Results.prototype.constructor = Results


Results.prototype.listItems = function (items) {
    var ul = this.container.getElementsByTagName('ul')[0];
    ul.innerHTML = "";

    items.forEach(function (item) {
        var li = document.createElement('li')
        ul.appendChild(li);

        this.paintItem(li, item)

    }.bind(this))
};

Results.prototype.paintItem = function (li, item) {
    li.innerText = item
}

