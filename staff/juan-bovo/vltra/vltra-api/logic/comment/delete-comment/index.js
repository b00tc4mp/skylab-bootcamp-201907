const { models: { User, Post, Comment } } = require('vltra-data')
const { validate} = require('vltra-utils')

/**
 * Deletes a comment from a post
 * @param {objectId} commentId mongoose embedded comment id to delete
 * @param {objectId} postId mongoose post id where comment should be embedded
 * 
 * @returns {undefined}
 */

module.exports = function(commentId, postId) { //(commentId, postId, email, password)
    
    validate.objectId(commentId, 'commentId')
    validate.objectId(postId, 'postId')
    
    return( async () => {
        //Problema: el punto aquí es que un usuario no pueda borrar comentarios de otro usuario.
        //Hipotética solución: habría que buscar el comentario por su id, extraer el commentAuthor de allí, buscarlo, ¿verificar email y password?, y recién allí hacer un splice de ese commentId del array post.comments y, además, eliminar el comentario en DB.

        //Por ahora, solo lo voy a implementar para que elimine el commentId del array post.comments, como hacíamos con las tarjetas.

        const post = await Post.findById(postId)

        if (!post) throw Error(`post with id ${postId} does not exists`)

        const { comments } = post
        
        const index = comments.findIndex(comment => comment.id === commentId)
        if (index<0) throw Error(`commentId with value ${commentId} not found`)
        comments.splice(index, 1)
        
        await post.save()

    })()
}