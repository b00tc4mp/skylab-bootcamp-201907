function GifDetail({ gif: { data: { id, title, images, import_datetime, bitly_url}, favorite }, onBack, onToggle }) {
    return <section className={`detail`}>
        <h3 className={`detail__title`}>{title}</h3>
        <img className={`detail__photo`} src={images.downsized_large.url}/>
        <p>{import_datetime}</p>
        <a  className={`detail__link`} href={bitly_url}>View on Gihpy</a>
        <FavButton active={favorite} onToggle={() => onToggle(id)}/>
        {onBack && <a  className={`detail__back`} href="" onClick={ event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>}
    </section>
}