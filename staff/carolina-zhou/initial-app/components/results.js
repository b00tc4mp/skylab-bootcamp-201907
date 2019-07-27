/**
 * Results abstraction.
 */
class Results extends Component {
    constructor(container) {
        super(container);
    }

    listItems(items) {
        const ul = document.getElementsByClassName('duck-results__list')[0];
        ul.innerHTML = '';

        items.forEach(item => {
            const li = document.createElement('li');

            ul.appendChild(li);

            this.paintItem(li, item);
        }); // WATCH this
    }

    paintItem(li, item) {
        li.innerText = item;
    }
}