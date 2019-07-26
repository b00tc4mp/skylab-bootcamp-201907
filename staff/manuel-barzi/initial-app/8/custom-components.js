/**
 * Duck Home abstraction.
 * 
 * @param {HTMLElement} container 
 */
function DuckHome(container) {
    Component.call(this, container);

    var sections = this.container.getElementsByTagName('section');

    var search = new Search(sections[0]);
    this.search = search;

    var results = new Ducks(sections[1]);
    this.results = results;

    var detail = new DuckDetail(sections[2]);
    this.detail = detail;
}

DuckHome.prototype = Object.create(Component.prototype);
DuckHome.prototype.constructor = DuckHome;

DuckHome.prototype.onClickLogout = function (expression) {
    var logout = this.container.children[1];

    logout.addEventListener('click', function (event) {
        event.preventDefault();

        expression();
    });
};

/**
 * Ducks abstraction.
 * 
 * @param {HTMLElement} container 
 */
function Ducks(container) {
    Results.call(this, container);
}

Ducks.prototype = Object.create(Results.prototype);
Ducks.prototype.constructor = Ducks;

Ducks.prototype.paintItem = function (li, duck) {
    var h3 = document.createElement('h3');

    h3.innerText = duck.title;

    li.appendChild(h3);

    var img = document.createElement('img');
    img.src = duck.imageUrl;

    li.appendChild(img);

    li.addEventListener('click', function(event) {
        event.preventDefault();

        this.onClickItem(duck.id);
    }.bind(this));
};

Ducks.prototype.onClickItem = function(id) {
    console.log(id);
};

/**
 * Duck Detail abstraction.
 * 
 * @param {HTMLElement} container 
 */
function DuckDetail(container) {
    Component.call(this, container);
}

DuckDetail.prototype = Object.create(Component.prototype);
DuckDetail.prototype.constructor = DuckDetail;

DuckDetail.prototype.displayDuck = function(duck) {
    var title = this.container.getElementsByTagName('h3')[0];
    title.innerText = duck.title;

    var image = this.container.getElementsByTagName('img')[0];
    image.src = duck.imageUrl;

    var price = this.container.getElementsByTagName('span')[0];
    price.innerText = duck.price;

    var description = this.container.getElementsByTagName('p')[0];
    description.innerText = duck.description;

    var link = this.container.getElementsByTagName('a')[0];
    link.href = duck.link;
};