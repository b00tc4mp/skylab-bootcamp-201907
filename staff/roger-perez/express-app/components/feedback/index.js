module.exports = function(message, level) { // level: 'error', 'warn', 'success'
    return `<p class="${`feedback feedback--${level? level : 'error'}"`}>${message}</p>`
}