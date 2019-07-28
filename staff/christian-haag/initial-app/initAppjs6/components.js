'use strict'

/**
 * 
 * Component abstraction
 * 
 * @param {HTMLElement} container 
 */

class Component {
    constructor(container) {
        if (!(container instanceof HTMLElement)) throw new TypeError(container + ' is not an HTMLElement')
        this.container = container;
    }
    show() {
        this.container.classList.remove('hide');
        this.container.classList.add('show');
    };

    hide() {
        this.container.classList.remove('show')
        this.container.classList.add('hide')
    };
}


/**
 * Landing abstraction
 * 
 * @param {HTMLElement} container 
 */

class Landing extends Component {
    constructor(container) {
        super(container);
    };

    onNavigateToRegister(expression) {
        var registerLink = this.container.children[0].children[0];

        registerLink.addEventListener('click', event => {
            event.preventDefault();
            expression();
        });

    };

    onNavigateToLogin(expression) {
        var loginLink = this.container.children[0].children[1];

        loginLink.addEventListener('click', event => {
            event.preventDefault();
            expression();
        });

    };
}



/**
 * 
 * Submit Back abstraction.
 * 
 * @param {HTMLElement} container 
 */


class SubmitBack extends Component {
    constructor(container) {
        super(container);
        let feedback = new Feedback(this.container.children[1]);
        feedback.hide();
        this.feedback = feedback;
    }

    onNavigateBack(expression) {
        let backLink = this.container.children[2];

        backLink.addEventListener('click', event => {
            event.preventDefault();
            expression();
        });
    }

    showFeedBack(message) {
        this.feedback.setMessage(message);
        this.feedback.show();
    }

    show() {
        this.feedback.hide();
        super.show();
    }
};



class Register extends SubmitBack {
    constructor(container) {
        super(container);
    };

    onSubmitRegister(expression) {
        let form = this.container.children[0];

        form.addEventListener('submit', event => {
            event.preventDefault();

            let name = event.target.name.value;
            let surname = event.target.surname.value;
            let email = event.target.email.value;
            let password = event.target.password.value;

            expression(name, surname, email, password);
        });
    };
}




/**
 * 
 *
//  * Register success Panel abstraction
//  *
//  * @param {HTMLElement} container
//  */
class RegisterSuccess extends Component {
    constructor(container) {
        super(container);
    }
    onNavigateToLogin(expression) {
        let login = this.container.children[0];
        login.addEventListener('click', event => {
            event.preventDefault();

            expression();
        });
    };
};


/**
//  * Login Panel abstraction
//  * 
//  * @param {HTMLElement} container 
//  */

class Login extends SubmitBack {
    constructor(container) {
        super(container);
    }
    onSubmitLogin(expression) {
        let form = this.container.children[0];

        form.addEventListener('submit', event => {
            event.preventDefault();

            let email = event.target.email.value;
            let password = event.target.password.value;

            expression(email, password);
        });
    }

};
/**
 * Feedback abstraction.
 * @param {*} container 
 */

class Feedback extends Component {
    constructor(container) {
        super(container);
    }

    setMessage(message) {
        this.container.innerText = message;
    };
}

/**
 * Search abstraction.
 * 
 * @param {*} container 
 */

class Search extends Component {
    constructor(container) {
        super(container);
    }

    onSearch(expression) {
        let form = this.container.children[0];

        form.addEventListener('submit', event => {
            event.preventDefault();

            let query = form.query.value;

            expression(query);

        });
    }

};

// Search.prototype.refreshProducts = function (expression) {
//     var refreshButton = this.container.children[1].children[1].children[1]

//     refreshButton.addEventListener('click', function (event) {
//         event.preventDefault();
//         expression();
//     })
// }

class Results extends Component {
    constructor(container) {
        super(container);
    }
    listItems(items) {
        let ul = this.container.getElementsByTagName('ul')[0];
        ul.innerHTML = '';

        items.forEach(item => {
            var li = document.createElement('li');

            ul.appendChild(li);

            this.paintItem(li, item);
        })
    };

    paintItem(li, item) {
        li.innerText = item;
    };
}

