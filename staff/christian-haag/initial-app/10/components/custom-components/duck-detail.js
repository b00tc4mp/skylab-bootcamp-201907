class DuckDetail extends Component {
    constructor(container) {
        super(container);
    }

    displayDuck(item) {
        let element = (tag, index) => this.container.getElementsByTagName(tag)[index]

        let title = element('h2', 0)
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

    onClickBack(expression) {
        let backToList = this.container.lastElementChild

        backToList.addEventListener('click', event => {
            event.preventDefault();
            expression();
        });
    }
}