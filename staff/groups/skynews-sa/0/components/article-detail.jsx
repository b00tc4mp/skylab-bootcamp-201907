function ArticleDetail({article, onToggle, onBack}){
    
    return <>
    <section className="detail">
        <h3 className="detail-title">{article.title}</h3>
        <img className="detail-img" src={article.urlToImage}/>
        <p className="detail-data">Published: {article.publishedAt.slice(0,10)}</p>
        <h4 className="detail-description">{article.description}</h4>
        <FavButton active={article.favorite} onToggle={() => onToggle(article)}/>
        <a className="detail-link art-but" href={article.url}>Go to original article</a>
        {onBack && <a className="back-link art-but" href="" onClick={event=>{
        event.preventDefault()
        onBack()
        }}>Go Back</a>}
    </section>
    </>
}