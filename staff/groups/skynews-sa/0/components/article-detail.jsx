function ArticleDetail({article, onBack, onToggle}){
    
    return <>
    <h3>{article.title}</h3>
    <img src={article.urlToImage}/>
    <p>Published: {article.publishedAt.slice(0,10)}</p>
    <h4 >{article.description}</h4>
    <FavButton active={article.favorite} onToggle={() => onToggle(article)}/>
    <p>Go to original <a href={article.url}>article</a> </p>
    <a href="" onClick={event=>{
        event.preventDefault()

        onBack()
    }}>Go onBack</a>
    </>
}