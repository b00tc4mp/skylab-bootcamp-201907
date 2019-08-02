'use strict';

/**
 * Landing abstraction.
 * 
 * @param {HTMLElement} container 
 */
class Favourite extends Results{
    constructor(container){
        super(container)
    }

    listItems(items){
        var ul = this.container.getElementsByTagName('ul')[0];
        ul.innerHTML = '';

        items.forEach( (item) => {
            var li = document.createElement('li');

            ul.appendChild(li);

            this.paintItem(li, item);
        }); // WATCH this
    }

}


