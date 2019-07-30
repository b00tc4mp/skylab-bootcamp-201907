const { Component } = React


ReactDOM.render(<Landing />, document.querySelector('#root'))


/* class DuckDetail extends Component {
    constructor() {
        super()
    }
    
    displayDuck(duck) {
        const title = this.container.getElementsByTagName('h3')[0]
        title.innerText = duck.title
    
        const image = this.container.getElementsByTagName('img')[0]
        image.src = duck.imageUrl
    
        const price = this.container.getElementsByTagName('span')[0]
        price.innerText = duck.price
    
        const description = this.container.getElementsByTagName('p')[0]
        description.innerText = duck.description
    
        const link = this.container.getElementsByTagName('a')[0]
        link.href = duck.link
    }
}

class DuckResults extends Results {
    constructor() {
        super()
    }

    paintItem(li, duck) {
        const h3 = document.createElement('h3')

        h3.innerText = duck.title

        li.appendChild(h3)

        const img = document.createElement('img')
        img.src = duck.imageUrl

        li.appendChild(img)

        const fav = document.createElement('button')
        fav.innerText = 'Add to Favorite'

        li.appendChild(fav)

        li.addEventListener('click', event => {
            event.preventDefault()

            this.onClickItem(duck.id)
        })
    }

    onClickItem(id) {
        console.log(id)
    }
}
 */



