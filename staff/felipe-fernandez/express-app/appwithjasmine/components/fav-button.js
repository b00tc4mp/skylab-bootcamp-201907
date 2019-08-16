function FavButton(active, duckId) {
    return `
    <form method="post" action="/toggleFav">
        <input type="hidden" name="duckId" value=${duckId}/>    
        
        <button>
        ${active? '💜' : '💔'}
        </button>
    </form>`
}

module.exports= FavButton