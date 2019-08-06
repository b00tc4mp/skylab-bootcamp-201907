function ArticleDetail({article, onBack, onToggle}){
    
    return <>
    <section className="detail">
        <h3 className="detail-title">{article.title}</h3>
        <img className="detail-img" src={article.urlToImage}/>
        <p className="detail-data">Published: {article.publishedAt.slice(0,10)}</p>
        <h4 className="detail-description">{article.description}</h4>
        <FavButton active={article.favorite} onToggle={() => onToggle(article)}/>
        <a className="detail-Link" href={article.url}>Go to original article</a>
        <a className="detaul-back" href="" onClick={event=>{
        event.preventDefault()
        onBack()
        }}>Go onBack</a>
    </section>
    </>
}