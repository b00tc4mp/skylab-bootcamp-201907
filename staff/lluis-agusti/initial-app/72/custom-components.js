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

    // TODO detail
    // var detail = new DuckDetail(sections[2]);
    // this.detail = detail;
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

        this.onItemClick(duck.id);
    }.bind(this));
};

Ducks.prototype.onItemClick = function(id) {
    console.log(id);
    logic.retrieveDuck (id, expression)
    // retrieveDuck (id, expression) {
    //     console.log(id);
    // }
};









// PATO EN DETALLE

/**
 * Ducks abstraction.
 * 
 * @param {HTMLElement} container 
 */
function DuckDetail(container) {
    Results.call(this, container);
}

DuckDetail.prototype = Object.create(Results.prototype);
DuckDetail.prototype.constructor = DuckDetail;

DuckDetail.prototype.paintItem = function (li, duck) {
    
    var h3 = document.createElement('h3');
    h3.innerText = "Your next duck: " + duck.title;
    li.appendChild(h3);

    var h4 = document.createElement('h4');
    h4.innerText = "Almost free: " + duck.price;
    li.appendChild(h4);
    
    var img = document.createElement('img');
    img.src = duck.imageUrl;
    li.appendChild(img);

    var p = document.createElement('p');
    p.innerText = "Description: " + duck.description;
    li.appendChild(p);





    // li.addEventListener('click', function(event) {
    //     event.preventDefault();

    //     this.onItemClick(duck.id);
    // }.bind(this));
};