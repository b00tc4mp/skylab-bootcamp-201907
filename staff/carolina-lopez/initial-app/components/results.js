'use strict'

/**
 * Results abstraction.
 */
class Results extends Component {
    constructor(container){
        super(container)
    }
    listItems = items => {
        if(items.error){
            throw new Error(items.error)
        } else {
        let ul = this.container.getElementsByTagName('ul')[0]
        ul.innerHTML = ''
    
            items.forEach(item => {
                let li = document.createElement('li')
    
                ul.appendChild(li)
    
                this.paintItem(li, item)
            })
        }
    }
    
    paintItem = (li, item) => {
        li.innerText = item
    }
}






