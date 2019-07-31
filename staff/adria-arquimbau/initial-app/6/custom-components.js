//COMPONENTS ESPECIFICOS QUE HEREDAN DE ALGUN COMPONENT.JS PERO TIENEN FUNCIONALIDAD ESPECIFICA



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

    var results = new DuckResults(sections[1]);

    this.results = results;
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

// /**
//  * Duck abstraction.
//  * @param {*} container 
//  */
// function Duck(container, info) {
//     Component.call(this, container);

//     var h3 = document.createElement('h3');

//     h3.innerText = info.title;

//     container.appendChild(h3);

//     var img = document.createElement('img');

//     img.src = info.imageUrl;

//     container.appendChild(img);
// }

// Duck.prototype = Object.create(Component.prototype);
// Duck.prototype.constructor = Duck;

/**
 * Duck Results abstraction.
 * 
 * @param {HTMLElement} container 
 */
function DuckResults(container) {
    Results.call(this, container);
}

DuckResults.prototype = Object.create(Results.prototype);
DuckResults.prototype.constructor = DuckResults;

DuckResults.prototype.paintItem = function (li, item) {
    var h3 = document.createElement('h3');

    h3.innerText = item.title;

    li.appendChild(h3);

    var img = document.createElement('img');

    img.src = item.imageUrl;

    li.appendChild(img);
};