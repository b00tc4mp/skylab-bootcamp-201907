class Favorite extends React.Component {
    render() {
        return <>
            <ul>
                {users[0].favorites.forEach(item => <li><h2>{item}</h2></li>)}
            </ul>
        </>
    }
}
