'use strict';

/**
 * Results abstraction.
 * 
 */

class Results extends Component{
    constructor (container){
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
    paintItem(li,item){
        li.innerText = item;
    }
}

