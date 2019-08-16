function ArticleDetail({article, onToggle, onBack}){
    
    return <>
    <section className="detail">
        <h3 className="title">{article.title}</h3>
        <img className="detail__img" src={article.urlToImage}/>
        <p className="detail__data">Published: {article.publishedAt.slice(0,10)}</p>
        <h4 className="detail__description">{article.description}</h4>
        <ul className="art-ul">
        <FavButton active={article.favorite} onToggle={() => onToggle(article)}/>
            <li className="art-li">
                <a className="art-but" href={article.url}>Go to original article</a></li>
                {onBack && 
            <li className="art-li">
                <a className="art-but" href="" onClick={event=>{
                event.preventDefault()
                onBack()
                }}>Go Back</a></li>}
        </ul>
    </section>
    </>
}