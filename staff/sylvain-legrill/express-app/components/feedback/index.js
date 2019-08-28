module.exports = function(message, level) { 
    return `<p class="${`feedback feedback--${level? level : 'error'}"`}>${message}</p>`
} 
