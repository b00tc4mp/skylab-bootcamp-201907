/**
 * Duck Home abstraction.
 * 
 * @param {*} container 
 */

class DuckHome extends Component {
    constructor(container) {
        super(container);

        const search = new Search(container.getElementsByClassName('home-panel__form')[0]);
        this.search = search;

        const onSearchError = new Feedback(container.getElementsByClassName('alert')[0]);
        this.onSearchError = onSearchError;
    }

    onClickLogout(expression) {
        const logoutButton = this.container.children[1].children[0]

        logoutButton.addEventListener('click', event => {
            event.preventDefault();
            expression();
        });
    }

    showFeedBack = message => {
        this.onSearchError.setMessage(message);
        this.onSearchError.show();
    }

};

