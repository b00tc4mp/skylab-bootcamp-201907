/**
 * Duck Home abstraction.
 * 
 * @param {HTMLElement} container 
 */
class DuckHome extends Component {
    constructor(container) {
        super(container);

        let search = new Search(container.getElementsByClassName('search')[0]);
        this.search = search;

        let results = new DuckResults(container.getElementsByClassName('duck-results')[0]);
        this.results = results;

        let detail = new DuckDetail(container.getElementsByClassName('duck-detail')[0]);
        this.detail = detail;

        const feedback = new Feedback(container.getElementsByClassName('feedback')[0]);
        feedback.hide();
        this.feedback = feedback;
    }

    onClickLogout(expression) {
        const logout = this.container.children[1];

        logout.addEventListener('click', event => {
            event.preventDefault();

            expression();
        });
    }

    showFeedback = message => {
        this.feedback.setMessage(message);
        this.feedback.show();
    }
}
