const button = <button className='hola-mundo'>hola mundo</button>

const names = ['John', 'Mary', 'James', 'Anna']

const lis = names.map(name => <li>{name}</li>)

const ul = <ul>{lis}</ul>

ReactDOM.render([button, ul], document.querySelector('#root'))