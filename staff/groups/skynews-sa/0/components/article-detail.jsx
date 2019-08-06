function ArticleDetail({article: { title, urlToImage,description,url,publishedAt}}){
    
    return <>
    <h3>{title}</h3>
    <img src={urlToImage}/>
    <p>Published: {publishedAt.slice(0,10)}</p>
    <h4 >{description}</h4>
    <p>Go to original <a href={url}>article</a> </p>
    <a href="" onClick={event=>{
        event.preventDefault()
        onBack()
    }}>Go onBack</a>
    </>
}