/**
 * Duck Home abstraction.
 * 
 * @param {*} container 
 */

class DuckHome extends Component {
    constructor(container) {
        super(container);

        let search = new Search(container.getElementsByTagName('section')[0]);
        this.search = search;

    }

    onClickLogout(expression) {
        let logoutButton = this.container.children[2]

        logoutButton.addEventListener('click', event => {
            event.preventDefault();
            expression();
        });
    }


};

/**
 * 
 *  Result Panel abstraction.
 * 
 * @param {*} container 
 */

class ResultPanel extends Component {
    constructor(container) {
        super(container);

        let result = new DuckResult(container.children[0])
        this.result = result

        let detail = new DuckDetail(container.children[1])
        this.detail = detail
    }

}

/**
 * 
 * Ducks abstraction.
 * 
 * @param {*} container 
 */

class DuckResult extends Results {
    constructor(container) {
        super(container)
    }

    paintItem(li, item) {

        let h3 = document.createElement('h3');
        h3.innerText = item.title;
        li.appendChild(h3);

        let img = document.createElement('img');
        img.src = item.imageUrl
        li.appendChild(img)

        let p = document.createElement('p');
        p.innerText = item.price
        li.appendChild(p);

        li.addEventListener('click', event => {
            event.preventDefault();
            this.onClickItem(item.id);
        });
    };

    onClickItem(expression) {
        this.onClickItem = expression
    }
}

class DuckDetail extends Component {
    constructor(container) {
        super(container);
    }

    displayDuck(item) {
        let element = (tag, index) => this.container.getElementsByTagName(tag)[index]

        let title = element('h3', 0)
        title.innerText = item.title;

        let img = element('img', 0)
        img.src = item.imageUrl;


        let price = element('p', 0)
        price.innerText = item.price;


        let description = element('p', 1)
        description.innerText = item.description;


        let link = element('a', 0)
        link.href = item.link;
    }
}

