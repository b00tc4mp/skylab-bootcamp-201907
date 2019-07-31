'use strict'

/**
 * 
 * Result abstraction.
 * @param {*} container 
 * 
 */

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