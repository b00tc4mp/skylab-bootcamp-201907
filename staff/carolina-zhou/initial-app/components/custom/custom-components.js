/**
 * Duck Home abstraction.
 * 
 * @param {HTMLElement} container 
 */
class DuckHome extends Component {
    constructor(container) {
        super(container);

        const search = new Search(this.container.getElementsByClassName('search')[0]);
        this.search = search;

        const results = new Ducks(this.container.getElementsByClassName('results')[0]);
        this.results = results;

        const detail = new Ducks(this.container.getElementsByClassName('detail')[0]);
        this.detail = detail;

        /* const sections = this.container.getElementsByTagName('section');

        let search = new Search(sections[0]);
        this.search = search;

        let results = new Ducks(sections[1]);
        this.results = results;

        let detail = new DuckDetail(sections[2]);
        this.detail = detail; */
    }

    onClickLogout(expression) {
        const logoutButton = document.getElementsByClassName('home__logout')[0];

        logoutButton.addEventListener('click', event => {
            event.preventDefault();

            expression();
        });
    }
}

/**
 * Ducks abstraction.
 * 
 * @param {HTMLElement} container 
 */
class Ducks extends Results {
    constructor(container) {
        super(container);
    }

    paintItem(li, {title, imageUrl, id}) {
        const h3 = document.createElement('h3');

        h3.innerText = title;
        li.appendChild(h3);

        const img = document.createElement('img');
        img.src = imageUrl;
        li.appendChild(img);

        li.className = "search__item";
        img.className = "search__image";

        li.addEventListener('click', event => {
            event.preventDefault();

            this.onItemClick(id);
        });
    }

    onItemClick(id) {
        console.log(id);
    }
}