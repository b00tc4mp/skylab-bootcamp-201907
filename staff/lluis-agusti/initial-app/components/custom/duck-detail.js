/**
 * Duck Detail abstraction.
 * 
 * @param {HTMLElement} container 
 */

class DuckDetail extends Results {
    constructor(container) {
        super(container)
    }

    displayDuck = (duck) => {

        // const favourites.push(
        //     users[0][favourites].push({
        //         title: (duck.title).toString(),
        //         img: (duck.imageUrl).toString(),
        //         price: (duck.price).toString(),
        //         password: (duck.link).toString()
        // )}


        let favouriteOrNot = this.container.getElementsByTagName('button')[0]
        favouriteOrNot.innerText = duck.id

        // for each de los tres id's en
        // 0[favoritos][id].forEach()
        //[“5c3853aebd1bde8520e66e11”, “5c3853aebd1bde8520e66e7e”, “5c3853aebd1bde8520e66e4f”]


        let title = this.container.getElementsByTagName('h3')[0]
        title.innerText = duck.title

        let image = this.container.getElementsByTagName('img')[0]
        image.src = duck.imageUrl;

        let price = this.container.getElementsByTagName('span')[0]
        price.innerText = duck.price

        let description = this.container.getElementsByTagName('p')[0]
        description.innerText = duck.description

        let link = this.container.getElementsByTagName('a')[0]
        link.href = duck.link

        // li.addEventListener('click', (event) => {
        //     event.preventDefault()

        //     this.onClickItem(duck.id)
        // })

        
        favouriteOrNot.addEventListener('click', (event) => {
             event.preventDefault()
             alert("ID " + duck.id + "pushed to users[0].favourites")
             users[0].favourites.push(duck.id)
            this.onClickItem(duck.id)
         })
    }

    onNavigateBack = expression => {
        const back = this.container.getElementsByTagName('a')[1] // HTML fer selectr by classname
    
        back.addEventListener('click', event => {
            event.preventDefault()
    
            expression()
        })
    }
}