
class Component {
    constructor(container) {
        if (!(container instanceof HTMLElement)) throw new TypeError(container + ' is not an HTMLElement')
        this.container = container
    }
    hide() {
        this.container.classList.remove('show')
        this.container.classList.add('hide')
    }
    show() {
        this.container.classList.remove('hide')
        this.container.classList.add('show')
    }
}

class Home extends Component {
    constructor(container) {
        super(container)
    }
    onEnroll(expression) {
        const enroll = this.container.getElementsByClassName('enrollButton')[0]
        enroll.addEventListener('click', function (event) {
            event.preventDefault()
            expression();
        });
    }
    onSignIn(expression) {
        const signIn = this.container.getElementsByClassName('signInButton')[0]
        signIn.addEventListener('click', function (event) {
            event.preventDefault()
            expression()
        });
    }
}

class Enroll extends Component {
    constructor(container) {
        super(container)
    }
    onEnroll(expression) {
        const form = this.container.getElementsByClassName('enrollForm')[0]
        form.addEventListener('submit', function (event) {
            event.preventDefault()
            const name = event.target.name.value
            const lastName = event.target.lastName.value
            const email = event.target.email.value
            const pass = event.target.pass.value
            expression(name, lastName, email, pass)
            form.reset();
        });
    }
    onBack(expression) {
        const back = this.container.getElementsByClassName('backButton')[0]
        back.addEventListener('click', function (event) {
            event.preventDefault();
            expression()
        })

    }
}

class EnrollSuccess extends Component {
    constructor(container) {
        super(container)
    }
    onSignIn(expression) {
        const signIn = this.container.getElementsByClassName('signInButton')[0]
        signIn.addEventListener('click', function (event) {
            event.preventDefault()
            expression();
        });
    }
}

class SignIn extends Component {
    constructor(container) {
        super(container)
    }
    onSignIn(expression) {
        const form = this.container.getElementsByClassName('signInForm')[0]
        form.addEventListener('submit', function (event) {
            event.preventDefault()

            var email = event.target.email.value;
            var pass = event.target.pass.value;
            expression(email, pass)
            form.reset();
        })

    }
    onBack(expression) {
        const back = this.container.getElementsByClassName('backButton')[0]
        back.addEventListener('click', function (event) {
            event.preventDefault();
            expression();

        })

    }
}

class Landing extends Component {
    constructor(container) {
        super(container)
    }
    onLogOut(expression) {
        const logout = this.container.getElementsByClassName('logOutButton')[0]
        logout.addEventListener('click', function (event) {
            event.preventDefault();
            expression();

        })

    }
}

class Feedback extends Component {
    constructor(container) {
        super(container)
    }
    setMessage() {
        this.container.innerText = message;
    }

}


Feedback.prototype = Object.create(Component.prototype);
Feedback.prototype.constructor = Feedback;

Feedback.prototype.setMessage = function (message) {
    this.container.innerText = message;
};
