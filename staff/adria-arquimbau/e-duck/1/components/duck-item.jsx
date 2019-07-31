
function DuckItem({ duck: { title, imageUrl, price, id } }) {
    return <>
        <h3>{title}</h3>
        <img src={imageUrl} />
        <span>{price}</span>
        <i className="far fa-heart" onClick={ event => {
            event.preventDefault()
            event.stopPropagation()
            
                logic.addDuckToFavorites(__loggedUser__, id, error => {
                    error ? console.log(error) : document.querySelector('.fa-heart').classList.add('fas')
                })


        }} ></i>
    </>
}