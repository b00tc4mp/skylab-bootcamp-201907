
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
            expression()
        })
    }
    onSignIn(expression) {
        const signIn = this.container.getElementsByClassName('signInButton')[0]
        signIn.addEventListener('click', function (event) {
            event.preventDefault()
            expression()
        })
    }
}

class Enroll extends Component {
    constructor(container) {
        super(container)
    }
    onEnroll(expression) {
        const enroll = this.container.getElementsByClassName('enrollButton')[0]
        enroll.addEventListener('submit', function (event) {
            event.preventDefault()
            expression()
        })
    }
}

class SignIn extends Component {
    constructor(container) {
        super(container)
    }
}

