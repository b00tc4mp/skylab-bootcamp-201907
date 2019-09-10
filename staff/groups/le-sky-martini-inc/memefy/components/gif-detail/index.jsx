/**
 * Detailed view of a single item.
 */

function GifDetail({ gif: { data: { id, title, images, import_datetime, bitly_url}, favorite }, onBack, onToggle }) {
    return <section className={`detail`}>
        <h3 className={`detail__title`}>{title}</h3>
        <img className={`detail__photo`} src={images.downsized_large.url}/>
        <div className={`detail__group1`}>
            <p className={`detail__date`}>Posted: <time>{import_datetime}</time></p>
            <a  className={`detail__link`} href={bitly_url}>View on Gihpy</a>
        </div>
        <div className={`detail__group2`}>
            <p><FavButton active={favorite} onToggle={() => onToggle(id)}/></p>
            {onBack && <a  className={`detail__back`} href="" onClick={ event => {
                event.preventDefault()

                onBack()
            }}><i class="fas fa-arrow-left"></i> Go back to search</a>}
        </div>
    </section>
}