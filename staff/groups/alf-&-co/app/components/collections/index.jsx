function Collections(props){
    return <>
    <h3>Collections</h3>
     <ul className="container">
         <li><a href="" onClick={props.handleGoToFavorites}>Action</a></li>
         <li><a href="" onClick={props.handleGoToCollections}>Comedy</a></li>
         <li><a href="" onClick={props.handleLogout}>Scify</a></li>
    </ul> 

    </>
}