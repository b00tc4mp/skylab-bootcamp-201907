const button = React.createElement('button', { className: 'hola-mundo' }, 'hola mundo')

const names = ['John', 'Mary', 'James', 'Anna']

const lis = names.map(name => React.createElement('li', undefined, name))

const ul = React.createElement('ul', undefined, ...lis)

ReactDOM.render([button, ul], document.querySelector('#root'))