/**
 * Duck Home abstraction.
 * 
 * @param {*} container 
 */

function DuckHome(container) {
    Component.call(this, container)

    var section = this.container.getElementsByTagName('section')

    var search = new Search(section[0]);

    this.search = search;
};

DuckHome.prototype = Object.create(Component.prototype);
DuckHome.prototype.constructor = DuckHome;


DuckHome.prototype.onClickLogout = function (expression) {
    var logoutButton = this.container.children[2]

    logoutButton.addEventListener('click', function (event) {
        event.preventDefault();
        expression();
    });
}

/**
 * 
 * Ducks abstraction.
 * 
 * @param {*} container 
 */

function Ducks(container) {
    Results.call(this, container);
}

Ducks.prototype = Object.create(Results.prototype);
Ducks.prototype.constructor = Ducks;

Ducks.prototype.paintItem = function (li, item) {
    var h3 = document.createElement('h3');
    h3.innerText = item.title;
    li.appendChild(h3);

    var img = document.createElement('img');
    img.src = item.imageUrl
    li.appendChild(img);

    var p = document.createElement('p');
    p.innerText = item.price
    li.appendChild(p);

    li.addEventListener('click', function (event) {
        event.preventDefault();
        this.onItemClick(item.id);
    }.bind(this));
};

Ducks.prototype.onItemClick = function (id) {
    console.log(id)
}